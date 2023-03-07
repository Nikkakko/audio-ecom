// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      peru: string;
      chineseBlack: string;
      antiFlashWhite: string;
      lotionWhite: string;
      tangelo: string;
      white: string;
      black: string;
    };
    fontWeight: {
      regular: number;
      medium: number;
      semiBold: number;
      bold: number;
    };
    fontSize: {};
  }
}
