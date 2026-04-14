import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import ProductCard from '@/components/ProductCard';
import dbConnect from '@/lib/mongodb';
import LandingSettings from '@/models/LandingSettings';
import Category from '@/models/Category';
import Product from '@/models/Product';

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
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {settings.brandName}. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
