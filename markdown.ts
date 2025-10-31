export const parseWikiLinks = (content: string): string[] => {
  const regex = /\[\[(.*?)\]\]/g;
  const matches = content.match(regex);
  if (!matches) return [];
  return matches.map(m => m.slice(2, -2));
};

export const parseTags = (content: string): string[] => {
  const regex = /#(\w+)/g;
  const matches = content.match(regex);
  if (!matches) return [];
  return matches.map(m => m.slice(1));
};

export const renderMarkdownPreview = (content: string): string => {
  let html = content;
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>');
  
  // Bold and italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Links
  html = html.replace(/\[\[(.*?)\]\]/g, '<a href="#" class="text-blue-500 hover:underline">$1</a>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-500 hover:underline">$1</a>');
  
  // Code blocks
  html = html.replace(/```(.*?)```/gs, '<pre class="bg-gray-800 p-4 rounded-lg my-4"><code>$1</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-2 py-1 rounded">$1</code>');
  
  // Lists
  html = html.replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>');
  
  // Line breaks
  html = html.replace(/\n/g, '<br>');
  
  return html;
};
