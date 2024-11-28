import { toPng } from "html-to-image";
import { useState } from "react";

export const useBookToPng = (props: {
  container: HTMLDivElement | null;
  scale: number;
  width: number;
  height: number;
  title: string;
}) => {
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState(false);

  const filter = (node: HTMLElement) => {
    const exclusionClasses = ["book-pages", "book-back"];
    return !exclusionClasses.some((classname) =>
      node.classList?.contains(classname)
    );
  };

  const saveDataUrl = (link: string) => {
    const a = document.createElement("a");
    a.href = link;

    const filename = props.title.length ? props.title : Date.now().toString();

    a.download = `${filename.replaceAll(" ", "").slice(0, 10)}-${
      props.scale
    }x.png`;
    a.click();
  };

  const convertToPng = async () => {
    setError(null);

    try {
      if (!props.container) {
        return;
      }

      setLoading(true);

      const dataUrl = await toPng(props.container, {
        pixelRatio: props.scale,
        width: props.width,
        height: props.height,
        filter: filter,
      });

      saveDataUrl(dataUrl);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Could not convert to png");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    convertToPng,
    loading,
    error,
  };
};
