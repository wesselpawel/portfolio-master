# Globe Image Implementation for City Pages

## ✅ Changes Implemented

### 1. Updated Parallax Image Logic

**File:** `app/oferta/[slug]/page.tsx`

```typescript
// NEW: City-based posts now use earth.jpg
<ParallaxImage
  src={
    // Use globe image for city-based posts, otherwise use post's main image
    isCitySlug(slug)
      ? "/assets/earth.jpg"
      : typeof post.mainImage === "string" &&
        (post.mainImage.startsWith("http://") ||
          post.mainImage.startsWith("https://") ||
          post.mainImage.startsWith("/"))
      ? post.mainImage
      : "/assets/earth.jpg"
  }
  alt={post.title}
  // ... other props
/>
```

### 2. Updated JSON-LD Structured Data

The structured data now also uses the globe image for city pages:

```typescript
// JSON-LD also uses globe for city posts
image: isCitySlug(slug)
  ? "/assets/earth.jpg"
  : (/* fallback logic */)
```

### 3. Updated City Post Generator

**File:** `lib/cityPostGenerator.ts`

```typescript
// City posts are generated with globe image by default
mainImage: "/assets/earth.jpg",
images: ["/assets/earth.jpg"],
```

## 🎯 Result

### City Pages (globe image):

- `http://localhost:3000/oferta/strona-internetowa-warszawa` → 🌍 `/assets/earth.jpg`
- `http://localhost:3000/oferta/strona-internetowa-krakow` → 🌍 `/assets/earth.jpg`
- `http://localhost:3000/oferta/strona-internetowa-czestochowa` → 🌍 `/assets/earth.jpg`

### Regular Blog Posts (original image):

- `http://localhost:3000/oferta/regular-blog-post` → 📄 Original image from post

## 🔧 How It Works

1. **Detection**: Uses `isCitySlug(slug)` to identify city-based URLs
2. **Conditional Logic**: Shows globe image for cities, original image for blogs
3. **Consistency**: Applied to both parallax display and structured data
4. **Database**: New city posts are generated with globe image by default

## 🚀 Testing

To test the implementation:

1. Visit any city page: `/oferta/strona-internetowa-{city}`
2. Check that the hero image shows the globe (`/assets/earth.jpg`)
3. Compare with regular blog posts which show their original images
4. Verify in browser dev tools that structured data also references the globe image

## 📁 File Changes

- ✅ `app/oferta/[slug]/page.tsx` - Parallax image + JSON-LD
- ✅ `lib/cityPostGenerator.ts` - Default city post image
- ✅ Image exists at `/public/assets/earth.jpg`

The implementation automatically detects city-based slugs and displays the appropriate globe image while maintaining the original functionality for regular blog posts.
