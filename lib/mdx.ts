import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/blogs');

export type BlogPostMetadata = {
  title: string;
  date: string;
  description: string;
  slug: string;
};

export function getBlogPosts(): BlogPostMetadata[] {
  // Ensure the directory exists
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);
  
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        description: data.description as string,
      };
    });

  // Sort posts by date (newest first)
  return allPosts.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
}

export function getBlogPostBySlug(slug: string) {
  const fullPath = path.join(contentDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    metadata: {
      slug,
      title: data.title as string,
      date: data.date as string,
      description: data.description as string,
    },
    content,
  };
}
