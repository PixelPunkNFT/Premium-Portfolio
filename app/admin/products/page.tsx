'use client';

import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Edit, Trash2, GripVertical, Upload, Image as ImageIcon } from 'lucide-react';
import Modal from '@/components/Modal';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface Category {
  _id: string;
  title: string;
}

interface Product {
  _id: string;
  categoryId: string;
  title: string;
  description: string;
  image: string;
  targetUrl: string;
  sortOrder: number;
}

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: '',
    title: '',
    description: '',
    image: '',
    targetUrl: '',
  });

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    } else {
      fetchProducts();
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data);
  };

  const fetchProducts = async (categoryId?: string) => {
    const url = categoryId ? `/api/products?categoryId=${categoryId}` : '/api/products';
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setFormData((prev) => ({ ...prev, image: data.url }));
      toast.success('Image uploaded!');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        await fetch(`/api/products/${editingProduct._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        toast.success('Product updated!');
      } else {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        toast.success('Product created!');
      }

      setIsModalOpen(false);
      setFormData({ categoryId: '', title: '', description: '', image: '', targetUrl: '' });
      setEditingProduct(null);
      fetchProducts(selectedCategory);
    } catch (error) {
      toast.error('Failed to save product');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      toast.success('Product deleted!');
      fetchProducts(selectedCategory);
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProducts(items);

    try {
      await fetch('/api/products/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: items }),
      });
      toast.success('Products reordered!');
    } catch (error) {
      toast.error('Failed to reorder products');
      fetchProducts(selectedCategory);
    }
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        categoryId: product.categoryId,
        title: product.title,
        description: product.description,
        image: product.image,
        targetUrl: product.targetUrl,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        categoryId: selectedCategory || categories[0]?._id || '',
        title: '',
        description: '',
        image: '',
        targetUrl: '',
      });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Products</h1>
          <p className="text-gray-400">Manage your product showcase</p>
        </div>
        <button onClick={() => openModal()} className="btn-premium" disabled={categories.length === 0}>
          <Plus size={20} className="inline mr-2" />
          Add Product
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">Create a category first before adding products.</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Filter by Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:border-gold focus:outline-none"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="products">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {products.map((product, index) => (
                    <Draggable key={product._id} draggableId={product._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="card-premium flex items-center justify-between"
                        >
                          <div className="flex items-center flex-1">
                            <div {...provided.dragHandleProps} className="mr-4 cursor-grab active:cursor-grabbing">
                              <GripVertical className="text-gray-500" size={24} />
                            </div>
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden mr-4">
                              <Image src={product.image} alt={product.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-white">{product.title}</h3>
                              <p className="text-gray-400 text-sm mt-1">{product.description}</p>
                              <a
                                href={product.targetUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold text-sm hover:underline"
                              >
                                {product.targetUrl}
                              </a>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openModal(product)}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                              <Edit className="text-blue-400" size={20} />
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                              <Trash2 className="text-red-400" size={20} />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">No products found. Create your first one!</p>
            </div>
          )}
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Edit Product' : 'Add Product'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
            <select
              required
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:border-gold focus:outline-none"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:border-gold focus:outline-none"
              placeholder="Product name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:border-gold focus:outline-none"
              rows={3}
              placeholder="Product description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Image *</label>
            <div className="space-y-3">
              {formData.image && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <Image src={formData.image} alt="Preview" fill className="object-cover" />
                </div>
              )}
              <label className="flex items-center justify-center px-4 py-3 bg-black/50 border border-white/10 rounded-lg cursor-pointer hover:border-gold transition-colors">
                {uploading ? (
                  <span className="text-gray-400">Uploading...</span>
                ) : (
                  <>
                    <Upload size={20} className="text-gray-400 mr-2" />
                    <span className="text-gray-400">Upload Image</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Target URL *</label>
            <input
              type="url"
              required
              value={formData.targetUrl}
              onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
              className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg text-white focus:border-gold focus:outline-none"
              placeholder="https://example.com"
            />
          </div>

          <div className="flex space-x-3">
            <button type="submit" className="btn-premium flex-1" disabled={!formData.image || uploading}>
              {editingProduct ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
