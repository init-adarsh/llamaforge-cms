export function renderBlocks(blocks: any[]): string {
  if (!Array.isArray(blocks)) return '';

  return blocks.map(block => {
    switch (block.type) {
      case 'paragraph':
        return `<p>${renderChildren(block.children)}</p>`;
      case 'heading':
        const level = block.level || 1;
        return `<h${level}>${renderChildren(block.children)}</h${level}>`;
      case 'list':
        const tag = block.format === 'ordered' ? 'ol' : 'ul';
        return `<${tag}>${renderChildren(block.children)}</${tag}>`;
      case 'list-item':
        return `<li>${renderChildren(block.children)}</li>`;
      case 'quote':
        return `<blockquote>${renderChildren(block.children)}</blockquote>`;
      case 'code':
        return `<pre><code>${renderChildren(block.children)}</code></pre>`;
      case 'image':
        const imgUrl = block.image?.url || '';
        const alt = block.image?.alternativeText || '';
        return `<img src="${imgUrl}" alt="${alt}" class="rich-text-image" />`;
      default:
        return '';
    }
  }).join('');
}

function renderChildren(children: any[]): string {
  if (!Array.isArray(children)) return '';
  return children.map(child => {
    if (child.type === 'text') {
      let text = child.text || '';
      // Escape HTML entities to prevent XSS
      text = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

      if (child.bold) text = `<strong>${text}</strong>`;
      if (child.italic) text = `<em>${text}</em>`;
      if (child.underline) text = `<u>${text}</u>`;
      if (child.strikethrough) text = `<s>${text}</s>`;
      if (child.code) text = `<code>${text}</code>`;
      return text;
    }
    if (child.type === 'link') {
      const url = child.url || '';
      return `<a href="${url}">${renderChildren(child.children)}</a>`;
    }
    return '';
  }).join('');
}
