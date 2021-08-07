import React, { useEffect, useState } from "react";
import { Prompt } from "react-router-dom";

useUnsavedChangeWarning.propTypes = {};

function useUnsavedChangeWarning() {
  const [isDirty, setIsDirty] = useState(true);

  const lang = window.navigator.language;
  let message = "Changes you made may not be saved.";
  if (lang === "vi") {
    message = "Mọi thay đổi bạn thực hiện có thể không được lưu.";
  }
  useEffect(() => {
    window.onbeforeunload = isDirty && (() => message);
    return () => {
      window.onbeforeunload = null;
    };
  }, [isDirty]);

  const prompt = <Prompt when={isDirty} message={message} />;
  return [prompt, (value) => setIsDirty(value)];
}

export default useUnsavedChangeWarning;
