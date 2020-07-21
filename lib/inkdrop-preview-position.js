"use babel";

import chroma from "chroma-js";

const CONFIG_NAME_SPACE = "preview-position";
const CONFIG_KEY_BORDER_COLOR = "borderColor";
const CONFIG_KEY_PREVIEW_POSITION = "previewPosition";

const VARIABLES = {
  top: {
    width: "100%",
    height: "50%",
    previewTop: "0",
    previewLeft: "0",
    editorTop: "50%",
    editorLeft: "0",
    hasBorderBottomColor: true,
  },
  bottom: {
    width: "100%",
    height: "50%",
    previewTop: "50%",
    previewLeft: "0",
    editorTop: "0",
    editorLeft: "0",
    hasBorderTopColor: true,
  },
  left: {
    width: "50%",
    height: "100%",
    previewTop: "0",
    previewLeft: "0",
    editorTop: "0",
    editorLeft: "50%",
    hasBorderRightColor: true,
  },
  right: {
    width: "50%",
    height: "100%",
    previewTop: "0",
    previewLeft: "50%",
    editorTop: "0",
    editorLeft: "0",
    hasBorderLeftColor: true,
  },
};

const update = () => {
  const position = inkdrop.config.get(
    `${CONFIG_NAME_SPACE}.${CONFIG_KEY_PREVIEW_POSITION}`
  );
  const color = inkdrop.config.get(
    `${CONFIG_NAME_SPACE}.${CONFIG_KEY_BORDER_COLOR}`
  );

  if (!chroma.valid(color) && color !== "transparent") {
    return;
  }

  const variable = VARIABLES[position];

  document.documentElement.style.setProperty(
    "--inkdrop-preview-position_width",
    variable.width
  );

  document.documentElement.style.setProperty(
    "--inkdrop-preview-position_height",
    variable.height
  );

  document.documentElement.style.setProperty(
    "--inkdrop-preview-position_preview-top",
    variable.previewTop
  );

  document.documentElement.style.setProperty(
    "--inkdrop-preview-position_preview-left",
    variable.previewLeft
  );

  document.documentElement.style.setProperty(
    "--inkdrop-preview-position_editor-top",
    variable.editorTop
  );

  document.documentElement.style.setProperty(
    "--inkdrop-preview-position_editor-left",
    variable.editorLeft
  );

  document.documentElement.style.setProperty(
    "--inkdrop-preview-position_border-top-color",
    variable.hasBorderTopColor ? color : "transparent"
  );

  document.documentElement.style.setProperty(
    "--inkdrop-preview-position_border-bottom-color",
    variable.hasBorderBottomColor ? color : "transparent"
  );

  document.documentElement.style.setProperty(
    "--inkdrop-preview-position_border-left-color",
    variable.hasBorderLeftColor ? color : "transparent"
  );

  document.documentElement.style.setProperty(
    "--inkdrop-preview-position_border-right-color",
    variable.hasBorderRightColor ? color : "transparent"
  );
};

module.exports = {
  config: {
    [CONFIG_KEY_PREVIEW_POSITION]: {
      title: "Preview Position",
      type: "string",
      default: "bottom",
      enum: ["right", "bottom", "left", "top"],
    },
    [CONFIG_KEY_BORDER_COLOR]: {
      title: "Border Color",
      description:
        "A color keyword (like 'red') or a hex color value (like '#FF0000')",
      type: "string",
      default: "transparent",
    },
  },
  activate: () => {
    inkdrop.config.observe(
      `${CONFIG_NAME_SPACE}.${CONFIG_KEY_PREVIEW_POSITION}`,
      update
    );
    inkdrop.config.observe(
      `${CONFIG_NAME_SPACE}.${CONFIG_KEY_BORDER_COLOR}`,
      update
    );
  },
  deactivate: () => {},
};
