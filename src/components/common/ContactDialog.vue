<template>
  <Transition name="fade">
    <div
      v-show="$show"
      class="bg-dark-blur z-1000 dialog pointer-events-auto fixed inset-0 grid w-full cursor-pointer place-items-center"
      @click="hide()"
    >
      <div @click.stop class="container-md relative">
        <div
          class="surface-base dialog__inner dialog-grid relative overflow-hidden rounded-2xl shadow-xl"
        >
          <div class="overflow-hidden md:block">
            <slot name="image" />
          </div>
          <div
            class="hide-scrollbar dialog__content relative overflow-hidden p-8 md:p-14"
          >
            <form @submit.prevent="submit" class="grid gap-8">
              <div class="grid gap-4 pb-8">
                <h2 class="title-sm">{{ contact?.title }}</h2>

                <slot name="content" />
              </div>
              <div
                class="input-group z-20 w-full"
                v-if="contact.topics.length > 1"
              >
                <label class="field-label">{{ t("topic") }} *</label>
                <Popper
                  placement="bottom-start"
                  offsetDistance="1"
                  :show="showPopper"
                  class="w-full"
                >
                  <button
                    type="button"
                    @click="showPopper = !showPopper"
                    class="select surface-overlay w-full text-left"
                  >
                    {{ !!topic ? topic : t("select_topic") }}
                  </button>

                  <template #content>
                    <ul>
                      <li
                        v-for="(item, index) in contact.topics"
                        :key="index"
                        :class="
                          topic == item.label ? 'bg-dark bg-opacity-10' : ''
                        "
                      >
                        <button
                          type="button"
                          class="w-full p-2 text-left hover:bg-dark hover:bg-opacity-10"
                          @click="
                            setTopic(item);
                            showPopper = false;
                          "
                        >
                          {{ item.label }}
                        </button>
                      </li>
                    </ul>
                  </template>
                </Popper>
              </div>
              <div class="input-group">
                <label class="field-label">{{ t("name") }} *</label>
                <input
                  type="text"
                  name="name"
                  class="surface-overlay"
                  v-model="form.name"
                />
              </div>

              <div class="input-group">
                <label class="field-label">{{ t("email") }} *</label>
                <input
                  type="email"
                  name="email"
                  class="surface-overlay"
                  v-model="form.email"
                />
              </div>
              <div class="input-group">
                <label class="field-label">{{ t("phone") }}</label>
                <input
                  type="text"
                  name="phone"
                  class="surface-overlay"
                  v-model="form.phone"
                />
              </div>
              <div class="input-group">
                <label class="field-label">{{ t("message") }} *</label>
                <textarea
                  class="surface-overlay"
                  name="message"
                  id=""
                  cols="30"
                  rows="2"
                  ref="textarea"
                  v-model="input"
                ></textarea>
              </div>
              <div
                class="pointer-events-none right-5 mb-14 flex translate-y-10 justify-end md:sticky md:bottom-0"
              >
                <button
                  class="btn surface-primary pointer-events-auto"
                  type="submit"
                  :disabled="!canSubmit"
                >
                  {{ t("submit") }}
                </button>
              </div>
              <Loading :loading="loading" />
            </form>
          </div>
        </div>
        <button
          class="btn btn-icon surface-dark btn-absolute -right-3 -top-3 z-10"
          @click="hide()"
        >
          <slot />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, onMounted, reactive, computed } from "vue";
import { t } from "@util/translate";
import { useStore } from "@nanostores/vue";
import { showContact, contactTopic } from "@src/store";
import { useAsyncValidator } from "@vueuse/integrations/useAsyncValidator";
import { useTextareaAutosize } from "@vueuse/core";
import Loading from "@components/common/Loading.vue";
import "vue3-toastify/dist/index.css";
import { toast } from "vue3-toastify";

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import Popper from "vue3-popper";

const props = defineProps({
  contact: {
    type: Object,
  },
});

const $show = useStore(showContact);
const $contactTopic = useStore(contactTopic);
const form = reactive({ email: "", name: "", message: "", phone: "" });
const { textarea, input } = useTextareaAutosize();

const rules = {
  email: [
    {
      type: "email",
      required: true,
    },
  ],
  name: [
    {
      type: "string",
      required: true,
    },
  ],
  message: [
    {
      type: "string",
      min: 10,
      required: true,
    },
  ],
};
const { pass, isFinished, errorFields } = useAsyncValidator(form, rules);

onMounted(() => {});

const topic = ref(null);
const showPopper = ref(false);
const loading = ref(false);
const topicChannel = ref(null);
const topicEmail = ref(null);

const hide = () => {
  showContact.set(false);
};

const setTopic = (data) => {
  
  topic.value = data.label;
  topicEmail.value = data.email;
  topicChannel.value = data.slack_id;
};

if (props.contact.topics.length === 1) {
  setTopic(props.contact.topics[0]);
}

// Detectar topic desde el store cuando se abre el diálogo
watch(() => $show.value, (isOpen) => {
  if (isOpen && $contactTopic.value) {
    const requestedTopic = $contactTopic.value;
    console.log('Intentando seleccionar topic:', requestedTopic);
    console.log('Topics disponibles:', props.contact.topics.map(t => t.label));
    
    // Buscar el topic correspondiente en la lista
    const matchingTopic = props.contact.topics.find(
      t => t.label.toLowerCase() === requestedTopic.toLowerCase()
    );
    
    console.log('Topic encontrado:', matchingTopic);
    if (matchingTopic) {
      setTopic(matchingTopic);
    }
    // Limpiar el topic del store después de usarlo
    contactTopic.set(null);
  }
});

const canSubmit = computed(() => {
  const result = !loading.value && isFinished.value && pass.value && !!topic.value;
  console.log('canSubmit check:', {
    loading: loading.value,
    isFinished: isFinished.value,
    pass: pass.value,
    topic: topic.value,
    result
  });
  return result;
});

const mailData = computed(() => {
  return {
    email: form.email,
    name: form.name,
    topicChannel: topicChannel.value,
    topicEmail: topicEmail.value,
    message: `
Topic:  ${topic.value}\r\n
Name: ${form.name}\r\n
Phone: ${form.phone}\r\n
Email: ${form.email}\r\n
Message: \r\n${form.message}\r\n           `,
  };
});

const submit = () => {
  console.log('Enviando formulario...');
  console.log('Datos del formulario:', mailData.value);
  console.log('Proveedor:', props.contact.provider);
  
  loading.value = true; 
  if (!!props.contact.provider) {
    console.log('Enviando a:', `/api/contact-${props.contact.provider}`);
    fetch(`/api/contact-${props.contact.provider}`, {
      method: "POST",
      body: JSON.stringify(mailData.value),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => {
        console.log('Estado de respuesta:', r.status);
        return r.json();
      })
      .then((data) => {
        console.log('Datos de respuesta:', data);
        if (data.status === "ok") {
          toast.success(t("contact_thanks"));
          form.email = "";
          form.name = "";
          form.phone = "";
          form.message = "";
          input.value = "";
          hide();
        } else {
          console.error('Respuesta de error:', data);
          toast.error(t("contact_error"));
        }
      })
      .catch((e) => {
        console.error("Error de conexión:", e);
        toast.error(t("contact_error"));
      })
      .finally(() => {
        loading.value = false;
      });
  } else {
    console.error('¡Proveedor no configurado!');
    loading.value = false;
  }
};

watch(
  $show,

  (val) => {
    if (val) { 
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
  },
  { immediate: false },
);

watch(
  input,

  (val) => {
    form.message = val;
  },
  { immediate: false },
);
</script>

<style lang="postcss">
.z-1000 {
  z-index: 1000;
}
.dialog-grid {
  @apply grid grid-cols-1;
  @screen md {
    grid-template-columns: 4fr 5fr;
  }
}

.bg-dark-blur {
  @apply bg-dark bg-opacity-50 backdrop-blur-sm;
}

.dialog {
  --popper-theme-padding: 0;
  &__inner {
    max-height: calc(100vh - 2rem);
    overflow-x: hidden;
    overflow-y: auto;
    @screen md {
      height: min(100vh - 2rem, 40rem);
    }
  }

  &__content {
    @screen md {
      max-height: calc(100vh - 2rem);
      height: min(100vh - 2rem, 40rem);
      height: min(100vh - 2rem, 40rem);
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}

.input-group {
  @apply relative isolate flex flex-col gap-2;
  input,
  textarea,
  .select {
    @apply block w-full rounded-2xl px-3 py-2.5 focus:outline-primary;
  }
  .field-label {
    @apply text-sm font-medium;
    color: currentColor;
    opacity: 0.8;
  }
}
</style>
