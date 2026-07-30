'use client';

import dynamic from 'next/dynamic';

const componentMap: Record<string, React.ComponentType> = {
  WordCount: dynamic(() => import('./tools/WordCount'), { ssr: false }),
  JsonFormatter: dynamic(() => import('./tools/JsonFormatter'), { ssr: false }),
  JsonCompress: dynamic(() => import('./tools/JsonCompress'), { ssr: false }),
  Base64Tool: dynamic(() => import('./tools/Base64Tool'), { ssr: false }),
  Md5Tool: dynamic(() => import('./tools/Md5Tool'), { ssr: false }),
  ShaTool: dynamic(() => import('./tools/ShaTool'), { ssr: false }),
  UrlEncode: dynamic(() => import('./tools/UrlEncode'), { ssr: false }),
  HtmlEscape: dynamic(() => import('./tools/HtmlEscape'), { ssr: false }),
  MarkdownPreview: dynamic(() => import('./tools/MarkdownPreview'), { ssr: false }),
  TextDiff: dynamic(() => import('./tools/TextDiff'), { ssr: false }),
  RegexTest: dynamic(() => import('./tools/RegexTest'), { ssr: false }),
  UuidGenerator: dynamic(() => import('./tools/UuidGenerator'), { ssr: false }),
  UnitConvert: dynamic(() => import('./tools/UnitConvert'), { ssr: false }),
  DateCalc: dynamic(() => import('./tools/DateCalc'), { ssr: false }),
  TimestampConvert: dynamic(() => import('./tools/TimestampConvert'), { ssr: false }),
  CaseConvert: dynamic(() => import('./tools/CaseConvert'), { ssr: false }),
  NumberBaseConvert: dynamic(() => import('./tools/NumberBaseConvert'), { ssr: false }),
  ColorConvert: dynamic(() => import('./tools/ColorConvert'), { ssr: false }),
  TextSort: dynamic(() => import('./tools/TextSort'), { ssr: false }),
  TextDedup: dynamic(() => import('./tools/TextDedup'), { ssr: false }),
  UseragentParser: dynamic(() => import('./tools/UseragentParser'), { ssr: false }),
  IpLookup: dynamic(() => import('./tools/IpLookup'), { ssr: false }),
  CssMinify: dynamic(() => import('./tools/CssMinify'), { ssr: false }),
  JsMinify: dynamic(() => import('./tools/JsMinify'), { ssr: false }),
  SqlFormatter: dynamic(() => import('./tools/SqlFormatter'), { ssr: false }),
  CronGenerator: dynamic(() => import('./tools/CronGenerator'), { ssr: false }),
  HttpStatus: dynamic(() => import('./tools/HttpStatus'), { ssr: false }),
  AsciiTable: dynamic(() => import('./tools/AsciiTable'), { ssr: false }),
  QrcodeGenerate: dynamic(() => import('./tools/QrcodeGenerate'), { ssr: false }),
  QrcodeDecode: dynamic(() => import('./tools/QrcodeDecode'), { ssr: false }),
  PasswordGenerator: dynamic(() => import('./tools/PasswordGenerator'), { ssr: false }),
  RandomPicker: dynamic(() => import('./tools/RandomPicker'), { ssr: false }),
  PhoneLookup: dynamic(() => import('./tools/PhoneLookup'), { ssr: false }),
  IdCardParser: dynamic(() => import('./tools/IdCardParser'), { ssr: false }),
  BankCardValidate: dynamic(() => import('./tools/BankCardValidate'), { ssr: false }),
  Countdown: dynamic(() => import('./tools/Countdown'), { ssr: false }),
  CurrencyConvert: dynamic(() => import('./tools/CurrencyConvert'), { ssr: false }),
  HolidayCalc: dynamic(() => import('./tools/HolidayCalc'), { ssr: false }),
  LunarCalendar: dynamic(() => import('./tools/LunarCalendar'), { ssr: false }),
  BmiCalc: dynamic(() => import('./tools/BmiCalc'), { ssr: false }),
  AgeCalc: dynamic(() => import('./tools/AgeCalc'), { ssr: false }),
  ImageCompress: dynamic(() => import('./tools/ImageCompress'), { ssr: false }),
  ImageCrop: dynamic(() => import('./tools/ImageCrop'), { ssr: false }),
  ImageFormatConvert: dynamic(() => import('./tools/ImageFormatConvert'), { ssr: false }),
  ImageWatermark: dynamic(() => import('./tools/ImageWatermark'), { ssr: false }),
  ImageBgRemove: dynamic(() => import('./tools/ImageBgRemove'), { ssr: false }),
  ImageResize: dynamic(() => import('./tools/ImageResize'), { ssr: false }),
  ImageRotate: dynamic(() => import('./tools/ImageRotate'), { ssr: false }),
  ImageThumbnail: dynamic(() => import('./tools/ImageThumbnail'), { ssr: false }),
  ColorPicker: dynamic(() => import('./tools/ColorPicker'), { ssr: false }),
  ImageMerge: dynamic(() => import('./tools/ImageMerge'), { ssr: false }),
};

export default function ToolComponent({ componentName }: { componentName: string }) {
  const Comp = componentMap[componentName];
  if (!Comp) {
    return (
      <div className="tool-workspace">
        <div className="empty-state">
          <p>工具开发中，敬请期待</p>
        </div>
      </div>
    );
  }
  return <Comp />;
}
