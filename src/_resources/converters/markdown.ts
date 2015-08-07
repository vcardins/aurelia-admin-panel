import {bindable, autoinject, noView, skipContentProcessing} from 'aurelia-framework';
import * as commonmark from 'commonmark';
import {isExternalLink, titleToSlug} from '../util';

var reader = new commonmark.Parser(),
    writer = new commonmark.HtmlRenderer();

function getHtml(markdown:Markdown) {
  return writer.render(reader.parse(markdown));
}

function fixIndent(markdown:Markdown) {
  /*
  This is intended to remove indentation that is not really part of
  the markdown, to preserve the ability to indent the markup properly.

  In the example below the total indentation will be reduced by 4 characters.

  |
  |<template>
  |  <markdown>
  |    # hello world
  |
  |    lorem ipsum bla bla
  |
  |        var x = 3;
  |
  |  </markdown>
  |</template>
  |

  */
  var result = /^( +)\S/im.exec(markdown);
  if (result) {
    markdown = markdown.replace(new RegExp('^ {' + result[1].length.toString() + '}', 'gim'), '');
  }
  return markdown;
}

function fixBlockQuotes(markdown:Markdown) {
  return markdown.replace(/^(\s*)&gt;/gim, (match, p1) => p1 + '>');
}

function updateAnchorTargets(element:Element) {
  // external links need target="_blank"
  var anchors = element.getElementsByTagName('a'),
      i, ii;
  for(i = 0, ii = anchors.length; i < ii; i++) {
    if (!isExternalLink(anchors[i].href))
      continue;
    anchors[i].target = '_blank';
  }
}

function makeHeadingsLinkable(element:Element) {
  var headings = element.querySelectorAll('h1,h2,h3,h4,h5,h6'),
      i, ii, h, title, slug;
  for(i = 0, ii = headings.length; i < ii; i++) {
    h = headings[i];
    title = h.textContent;
    slug = titleToSlug(title);
    h.id = slug;
    h.innerHTML = `<a id="${slug}" class="anchor" href="#${slug}" aria-hidden="true"><span class="glyphicon glyphicon-link"></span></a>${title}`;
  }
}

function applySyntaxHighlighting(element:Element) {
  var codes = element.getElementsByTagName('code'),
      i, ii;
  for(i = 0, ii = codes.length; i < ii; i++) {
    // don't mess with code elements that are not enclosed in a pre.
    if (codes[i].parentNode.tagName !== 'PRE')
      continue;

    // trim the code to avoid strange appearance with line numbers.
    codes[i].textContent = codes[i].textContent.trim();

    // make sure there's a language-* class.
    if (!/language-/.test(codes[i].className))
      codes[i].className += ' language-javascript';

    // // make sure the parent pre has the line-numbers class.
    // if (!/line-numbers/.test(codes[i].parentNode.className))
    //   codes[i].parentNode.className += ' line-numbers';

    // apply syntax highlighting.
    //Prism.highlightElement(codes[i]);
  }
}

@skipContentProcessing
@noView
@autoinject
export class Markdown {
  @bindable value;
  element:Element;

  constructor(element:Element) {
    this.element = element;
    element.className += ' markdown-body';
    this.setContent(element.innerHTML || '');
  }

  valueChanged(newValue) {
    this.setContent(newValue);
  }

  setContent(markdown) {
    markdown = fixIndent(markdown);
    markdown = fixBlockQuotes(markdown);
    this.element.innerHTML = getHtml(markdown);

    updateAnchorTargets(this.element);
    makeHeadingsLinkable(this.element);
    applySyntaxHighlighting(this.element);
  }
}
