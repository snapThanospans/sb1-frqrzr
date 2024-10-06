import React, { useState } from 'react'

const AdminAbout: React.FC = () => {
  const [aboutContent, setAboutContent] = useState(`
    <h1>About Zuhrah Bath & Body</h1>
    <p>Zuhrah Bath & Body is a luxury bath and body care brand that offers high-quality, handcrafted products made with natural ingredients. Our mission is to provide our customers with a spa-like experience in the comfort of their own homes.</p>
    <h2>Our Story</h2>
    <p>Founded in 2020, Zuhrah Bath & Body started as a small, home-based business and has since grown into a beloved brand known for its luxurious products and commitment to sustainability.</p>
    <h2>Our Products</h2>
    <p>We offer a wide range of bath and body care products, including:</p>
    <ul>
      <li>Handmade soaps</li>
      <li>Bath bombs</li>
      <li>Body scrubs</li>
      <li>Essential oils</li>
      <li>Scented candles</li>
    </ul>
    <p>All our products are made with natural, ethically-sourced ingredients and are free from harsh chemicals and artificial fragrances.</p>
    <h2>Our Commitment to Sustainability</h2>
    <p>At Zuhrah Bath & Body, we are committed to reducing our environmental impact. We use eco-friendly packaging and support sustainable farming practices for our ingredients.</p>
  `)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAboutContent(e.target.value)
  }

  const handleSave = () => {
    // Here you would typically send the updated content to your backend
    console.log('Saving updated about content:', aboutContent)
    alert('About page content has been saved!')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit About Page</h1>
      <div className="mb-4">
        <label htmlFor="aboutContent" className="block text-sm font-medium text-gray-700 mb-2">
          About Page Content (HTML)
        </label>
        <textarea
          id="aboutContent"
          rows={20}
          className="w-full p-2 border rounded-md"
          value={aboutContent}
          onChange={handleContentChange}
        />
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Preview</h2>
        <div
          className="border rounded-md p-4 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: aboutContent }}
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Changes
      </button>
    </div>
  )
}

export default AdminAbout