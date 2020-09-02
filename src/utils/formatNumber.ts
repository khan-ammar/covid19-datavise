import { NormalModuleReplacementPlugin } from "webpack";

import Numeral from 'numeral';

export default function formatNumber(value: number): string {
  if (isNaN(value)) {
    return 'NaN';
  }

  return Numeral(value).format('0,0');
}