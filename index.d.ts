export {};
declare global {
  interface Window {
    toastr: {
      show(
        arg0: string,
        arg1: {
          type: string;
          animationType: string;
          placement: string;
          animationDuration?: number;
          duration?: number;
          style: { backgroundColor: string };
          textStyle: { color: string };
        }
      ): unknown;
      success: (message: string, title?: string) => void;
      error: (message: string, title?: string) => void;
      info: (message: string, title?: string) => void;
      warning: (message: string, title?: string) => void;
    };
  }
}
