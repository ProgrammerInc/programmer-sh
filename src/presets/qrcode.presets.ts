import { ImageSettings } from '@/components/ui/qr-code';

export const qrcodeLogos: Record<string, ImageSettings> = {
  programmerIcon: {
    src: '/images/programmer-icon-transparent.png',
    height: 69,
    width: 69,
    excavate: true,
    logoPadding: 13,
    logoPaddingStyle: 'circle',
    opacity: 1,
    quietZone: 0,
    removeQrCodeBehindLogo: true
  }
};

export default qrcodeLogos;
