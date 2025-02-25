export {};
declare global {
  interface Window {
    toastr: {
      show(
        arg0: string,
        arg1: {
          type: "normal" | "success" | "warning" | "danger" | "custom";
          animationType: "slide-in" | "zoom-in";
          placement: "top" | "bottom";
          animationDuration?: number;
          duration?: number;
          style?: { backgroundColor: string };
          textStyle?: { color: string };
        }
      ): unknown;
      success: (message: string, title?: string) => void;
      error: (message: string, title?: string) => void;
      info: (message: string, title?: string) => void;
      warning: (message: string, title?: string) => void;
    };
  }
}
