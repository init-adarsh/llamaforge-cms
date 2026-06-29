import type { Core } from '@strapi/strapi';

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // 1. Programmatically set up public API permissions
    try {
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (publicRole) {
        const publicActions = [
          'api::page.page.find',
          'api::page.page.findOne',
          'api::post.post.find',
          'api::post.post.findOne',
        ];

        for (const action of publicActions) {
          const existingPermission = await strapi.db.query('plugin::users-permissions.permission').findOne({
            where: {
              action,
              role: publicRole.id,
            },
          });

          if (!existingPermission) {
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: {
                action,
                role: publicRole.id,
                enabled: true,
              },
            });
            console.log(`[Bootstrap] Granted public permission for action: ${action}`);
          }
        }
      }
    } catch (err) {
      console.error('[Bootstrap] Failed to set public permissions:', err);
    }

    // 2. Programmatically seed default content if DB is empty
    try {
      // Check if any pages already exist
      const pageCount = await strapi.documents('api::page.page').count({});

      if (pageCount === 0) {
        console.log('[Bootstrap] No pages found. Seeding initial content...');

        // Helper to seed a page
        const seedPage = async (pageData: any) => {
          const doc = await strapi.documents('api::page.page').create({
            data: pageData,
            status: 'published',
          });
          console.log(`[Bootstrap] Seeded page: ${pageData.title} (${pageData.slug})`);
          return doc;
        };

        // Seed Home Page (with Hero and CTA blocks)
        await seedPage({
          title: 'Home',
          slug: 'home',
          excerpt: 'Welcome to LlamaForge - Fine-Tune & Run Local LLMs As A Service',
          content: '<p>Welcome to LlamaForge - Fine-Tune & Run Local LLMs As A Service</p>',
          blocks: [
            {
              __component: 'blocks.hero',
              enabled: true,
              badge_text: 'LlamaForge v2.0',
              headline: 'Fine-Tune & Run Local LLMs As A Service',
              subheadline: 'Build custom AI models, optimize parameters, and deploy production-ready APIs with ease.',
              cta_text: 'Get Started',
              cta_url: '/fine-tuning',
              secondary_cta_text: 'View Models',
              secondary_cta_url: '/models',
            },
            {
              __component: 'blocks.cta',
              enabled: true,
              variant: 'green',
              headline: 'Ready to Scale Your AI Infrastructure?',
              description: 'Join hundreds of developers building domain-specific models on our serverless GPU network.',
              btn_text: 'Start Training',
              btn_url: '/fine-tuning',
            }
          ],
          parent: 0,
        });

        // Seed Models Page
        const modelsPage = await seedPage({
          title: 'Models',
          slug: 'models',
          excerpt: 'Explore the open-source LLM foundation models supported on LlamaForge.',
          content: '<p>Explore our supported open-source foundation models.</p>',
          blocks: [],
          parent: 0,
        });

        // Seed Llama 3 Page
        await seedPage({
          title: 'Llama 3',
          slug: 'llama-3',
          excerpt: 'Meta\'s state-of-the-art open-source foundation model optimized for dialogue, reasoning, and coding assistance.',
          content: `
            <p>Llama 3 is Meta’s next-generation open-source large language model, designed to support conversational, reasoning, and coding tasks with high efficiency. Available in 8B and 70B parameter versions, Llama 3 is optimized to run smoothly on serverless GPU infrastructures.</p>
            <h2>Key Advantages</h2>
            <ul>
              <li><strong>Advanced Reasoning:</strong> Outperforms other open-source models on key math and logic benchmarks.</li>
              <li><strong>128K Token Context:</strong> Large context window support for document analysis and long-form coding.</li>
              <li><strong>LoRA Compatibility:</strong> Hyper-efficient adapter training using minimum GPU memory.</li>
            </ul>
          `,
          blocks: [],
          parent: modelsPage.id,
        });

        // Seed Fine-Tuning Page
        const fineTuningPage = await seedPage({
          title: 'Fine-Tuning',
          slug: 'fine-tuning',
          excerpt: 'Learn about our serverless GPU fine-tuning recipes.',
          content: '<p>Learn about our serverless GPU fine-tuning recipes.</p>',
          blocks: [],
          parent: 0,
        });

        // Seed QLoRA Training Page
        await seedPage({
          title: 'QLoRA Training',
          slug: 'qlora',
          excerpt: 'Quantized Low-Rank Adaptation technique allowing fine-tuning of 70B parameter models on a single GPU.',
          content: `
            <p>Quantized Low-Rank Adaptation (QLoRA) is an exceptionally memory-efficient fine-tuning approach. By freezing a 4-bit quantized base model and training small, 16-bit LoRA adapter weights, QLoRA slashes memory usage without sacrificing accuracy.</p>
            <h2>Features of QLoRA</h2>
            <ul>
              <li><strong>4-Bit Quantization:</strong> Double Quantization reduces model footprints significantly.</li>
              <li><strong>Single-GPU training:</strong> Fine-tune medium models on cheap consumer or standard serverless GPUs.</li>
              <li><strong>Zero Accuracy Loss:</strong> Retains full performance metrics compared to standard 16-bit LoRA.</li>
            </ul>
          `,
          blocks: [],
          parent: fineTuningPage.id,
        });

        // Seed Deployments Page
        await seedPage({
          title: 'Deployments',
          slug: 'deployments',
          excerpt: 'Deploy your fine-tuned models to dedicated serverless GPU endpoints.',
          content: '<p>Deploy your fine-tuned models to dedicated serverless GPU endpoints.</p>',
          blocks: [],
        });
      }

      // Check if any posts already exist
      const postCount = await strapi.documents('api::post.post').count({});

      if (postCount === 0) {
        console.log('[Bootstrap] No posts found. Seeding initial posts...');

        await strapi.documents('api::post.post').create({
          data: {
            title: 'Best Practices for Fine-Tuning Large Language Models',
            slug: 'llm-fine-tuning-best-practices',
            excerpt: 'Discover the essential strategies for fine-tuning open-source LLMs like Llama 3, including learning rates, data formatting, and hardware optimization.',
            content: `
              <p>Fine-tuning open-source models has become the gold standard for organizations seeking to build domain-specific AI applications. Rather than relying on generic cloud APIs, customizing your own weights ensures privacy, lower latency, and highly tailored responses.</p>
              
              <h2>1. Quality over Quantity in Training Data</h2>
              <p>The single most important factor for training convergence is data quality. Ensure your JSONL files contain clean, verified prompt-response pairs. Stripping out boilerplate text, code syntax errors, and duplicate samples prevents overfitting.</p>
              
              <h2>2. Selecting the Right Hyperparameters</h2>
              <p>A learning rate of 2e-5 with a cosine decay scheduler works best for LoRA/QLoRA adapters on Llama 3. Start with 3 to 5 epochs and monitor validation loss closely to avoid catastrophic forgetting.</p>
              
              <h2>Conclusion</h2>
              <p>By leveraging LlamaForge's serverless GPU runner, developers can execute these pipelines automatically, generating optimized model checkpoints in minutes.</p>
            `,
            date: new Date('2026-06-28T12:00:00.000Z'),
            category: 'AI Engineering',
          },
          status: 'published',
        });
        console.log('[Bootstrap] Seeded blog post: Best Practices for Fine-Tuning Large Language Models');
      }
    } catch (err) {
      console.error('[Bootstrap] Failed to seed default content:', err);
    }
  },
};
