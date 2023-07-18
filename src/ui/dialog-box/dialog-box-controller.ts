/**
 * Class allow us to control dialog box from any place, this is necessary
 * due to the restrictions of react three fiber, there are some parts where
 * this is needed.
 */
export class DialogBoxController {
  static nextLine: () => void;
  static setTextLines: (lines: string[]) => void;
  // Events
  static onAfterLastLine?: () => void;
}
