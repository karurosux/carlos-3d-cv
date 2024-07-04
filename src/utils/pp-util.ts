import {PP_PARAM} from '../constants';

export class PPUtils {
  static hasPP() {
    return window.location.search.includes(PP_PARAM);
  }

  static togglePPParam() {
    const hasPP = this.hasPP();
    if (hasPP) {
      window.location.search = '';
    } else {
      window.location.search += PP_PARAM;
    }
  }
}
