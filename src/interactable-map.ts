export interface InteractableActionBase {
  type: "dialog";
}

export interface InteractableDialogAction extends InteractableActionBase {
  type: "dialog";
  lines: string[];
}

export type InteractableAction = InteractableDialogAction;

export const interactableMap: Record<string, InteractableAction> = {
  "shelve-collider": {
    type: "dialog",
    lines: ["A lot of stuff here...", "This is my shelve."],
  },
  "desktop-collider": {
    type: "dialog",
    lines: [
      "This is the place where I work...",
      "All the magic happens here.",
      "Including this space!",
    ],
  },
  "thrash-collider": {
    type: "dialog",
    lines: ["Just a bunch of monster cans and snack packages."],
  },
};
