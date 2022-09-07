import { emitter } from '@/helpers/emitter';

export const utils = {
  showToast(message, color='bg-red-500') {
    const toast = {};
    toast.message = message;
    toast.color = color;
    emitter.emit('show-toast', toast);
  }
}