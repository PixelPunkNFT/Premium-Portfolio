import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import ProductCard from '@/components/ProductCard';
import dbConnect from '@/lib/mongodb';
import LandingSettings from '@/models/LandingSettings';
import Category from '@/models/Category';
import Product from '@/models/Product';

// Revalidate every 10 seconds to show fresh data
export const revalidate = 10;

async function getPageData() {
  await dbConnect();
  
  const settings = await LandingSettings.findOne().lean();
  const categories = await Category.find().sort({ sortOrder: 1 }).lean();
  const products = await Product.find().sort({ sortOrder: 1 }).lean();

  return {
    settings: settings ? JSON.parse(JSON.stringify(settings)) : {
      brandName: 'Premium Portfolio',
      introTitle: 'Welcome to My Premium Showcase',
      introDescription: 'Discover my exclusive collection of digital products and services',
      profileImage: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    },
    categories: JSON.parse(JSON.stringify(categories)),
    products: JSON.parse(JSON.stringify(products)),
  };
}

export default async function Home() {
  const { settings, categories, products } = await getPageData();

  return (
    <main className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero
          brandName={settings.brandName}
          introTitle={settings.introTitle}
          introDescription={settings.introDescription}
          profileImage={settings.profileImage}
        />

        <div className="py-12">
          {categories.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No content available yet.</p>
            </div>
          ) : (
            categories.map((category: any) => {
              const categoryProducts = products.filter(
                (p: any) => p.categoryId === category._id
              );

              if (categoryProducts.length === 0) return null;

              return (
                <CategorySection
                  key={category._id}
                  title={category.title}
                  description={category.description}
                >
                  {categoryProducts.map((product: any) => (
                    <ProductCard
                      key={product._id}
                      title={product.title}
                      description={product.description}
                      image={product.image}
                      targetUrl={product.targetUrl}
                    />
                  ))}
                </CategorySection>
              );
            })
          )}
        </div>

        <footer className="py-8 text-center border-t border-white/10">
          <p className="text-gray-500 text-sm mb-4">
            © {new Date().getFullYear()} {settings.brandName}. All rights reserved.
          </p>
          <a
            href="/admin/login"
            className="inline-flex items-center px-4 py-2 text-xs text-gray-500 hover:text-gold transition-colors duration-300"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Accesso Admin
          </a>
        </footer>
      </div>
    </main>
  );
}
