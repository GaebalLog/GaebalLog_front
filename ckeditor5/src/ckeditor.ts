/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Autosave } from '@ckeditor/ckeditor5-autosave';
import { Bold, Italic, Strikethrough, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import {
	AutoImage,
	Image,
	ImageCaption,
	ImageToolbar,
	ImageUpload
} from '@ckeditor/ckeditor5-image';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import { List, TodoList } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends ClassicEditor {
	public static override builtinPlugins = [
		Alignment,
		AutoImage,
		Autoformat,
		Autosave,
		Base64UploadAdapter,
		BlockQuote,
		Bold,
		CodeBlock,
		Essentials,
		FontBackgroundColor,
		FontColor,
		FontFamily,
		FontSize,
		Heading,
		HorizontalLine,
		Image,
		ImageCaption,
		ImageToolbar,
		ImageUpload,
		Indent,
		IndentBlock,
		Italic,
		List,
		MediaEmbed,
		Paragraph,
		Strikethrough,
		Table,
		TableToolbar,
		TextTransformation,
		TodoList,
		Underline
	];

	public static override defaultConfig = {
		toolbar: {
			items: [
				'undo',
				'redo',
				'heading',
				'|',
				'fontFamily',
				'fontSize',
				'bold',
				'italic',
				'underline',
				'strikethrough',
				'fontColor',
				'fontBackgroundColor',
				'|',
				'imageUpload',
				'mediaEmbed',
				'codeBlock',
				'insertTable',
				'horizontalLine',
				'|',
				'alignment',
				'blockQuote',
				'bulletedList',
				'numberedList',
				'todoList',
				'indent',
				'outdent'
			]
		},
		language: 'ko',
		image: {
			toolbar: [
				'imageTextAlternative',
				'toggleImageCaption'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			]
		}
	};
}

export default Editor;
