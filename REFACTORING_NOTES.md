# Schema Refactoring Notes

## Overview
This document outlines the comprehensive refactoring of `schema.ts` to align with TypeScript types defined in `types.ts` from the nimbus-tech frontend application.

## Goals Achieved
1. ✅ Added all TypeScript type definitions from `types.ts` to `schema.ts`
2. ✅ Ensured all Keystone lists have fields matching their corresponding types
3. ✅ Renamed and reorganized lists for maximum compatibility
4. ✅ Added proper validation and default values
5. ✅ Improved documentation with clear section comments

## Type Definitions Added

### Core Types
- `PageContent` - Base page content structure
- `CTA` - Call-to-action links
- `Language` - Language selector options
- `Certification` - Certification/credential data
- `Benefit` - Feature/benefit items
- `Testimonial` - Customer testimonial data
- `FaqItem` - FAQ question/answer pairs
- `ApproachStep` - Process/approach step items

### Composite Types
- `AnalyticsData` - Complete analytics section
- `AnalyticsSummaryItem` - Individual analytics row
- `AnalyticsStats` - Analytics statistics
- `OurApproachContent` - Complete approach section
- `HeroType` - Hero section configuration
- `NavigationSectionItem` - Navigation menu items
- `FooterSection` - Footer section structure
- `FooterSections` - All footer sections

### Helper Types
- `CompositePageContent<K, T>` - Add single extra field to PageContent
- `CompositePageContentWithExtras<E>` - Add multiple extra fields
- `CompositePageContentLC<K, T>` - With lowercase key transformation
- `CompositePageContentWithMap<T, K>` - With key mapping
- `FeatureVisualization` - Union type for visualization options

## Key List Changes

### Renamed Lists
- `FooterPart` → `FooterSection` (matches type name)
- `Testimonial` → `TestimonialSection` (clarifies it's a section, not individual item)

### New Lists Added
- `BenefitSection` - Groups benefits with a title
- `CertificationSection` - Groups certifications with description and CTA

### Field Changes by List

#### **Image**
- ✅ Made `src` and `alt` required
- ✅ Added default value for `fill` checkbox

#### **CTA**
- ✅ Added default value for `external` checkbox

#### **Certification**
- ✅ Added `certId` (integer) to match type's `id` field
- ✅ Changed `image` from relationship to text (stores path)
- ✅ Added `width` and `height` (required integers)

#### **HeroBanner**
- ✅ Added `icon` field (was missing)
- ✅ Added default value for `external` checkbox

#### **TestimonialItem**
- ✅ Added `rating` field (float, optional)
- ✅ Made `name`, `role`, `company`, and `content` required

#### **ApproachStep**
- ✅ Renamed `aid` to `stepId` for clarity
- ✅ Made all fields except optional ones required

#### **Feature**
- ✅ Renamed `fid` to `featureId` for clarity
- ✅ Changed `visualization` to select field with proper options
- ✅ Made `title` and `description` required

#### **Navigation**
- ✅ Changed `image` from relationship to text (stores path)
- ✅ Added `imageAlt` field

#### **PageContent**
- ✅ Changed `image` from relationship to text (stores path)
- ✅ Added `imageAlt` field
- ✅ Changed `sections` to many relationship (was single)
- ✅ Made `slug` unique index

#### **Language**
- ✅ Made both `label` and `value` required

#### **Footer**
- ✅ Added `title` field

#### **CtaSection**
- ✅ Added `title` and `description` fields

#### **Section**
- ✅ Updated type options to use plural forms (benefits, features, etc.)
- ✅ Changed `contentBenefits` to reference `BenefitSection` (single)
- ✅ Changed `contentCertifications` to reference `CertificationSection` (single)
- ✅ Renamed `contentApproaches` to `contentApproach` (singular)
- ✅ Changed `contentTestimonials` to reference `TestimonialSection`

## Design Decisions

### Image Storage
**Decision:** Store image paths as text instead of Image relationships in most content types.

**Rationale:**
- The frontend `types.ts` expects string paths (e.g., `image: string`)
- Simpler data structure for content editors
- Image metadata (width, height, alt) stored inline where needed (e.g., Certification)
- Image list still available for complex cases needing relationships

### ID Fields
**Decision:** Use custom ID fields (e.g., `certId`, `stepId`, `featureId`) alongside Keystone's auto-generated IDs.

**Rationale:**
- Types specify numeric IDs used in the frontend
- Keystone auto-generates UUIDs, but content may reference specific integer IDs
- Allows migration of existing data with preserved IDs

### Section vs Individual Items
**Decision:** Created separate "Section" lists (e.g., `BenefitSection`, `CertificationSection`) that contain collections.

**Rationale:**
- Frontend often needs section-level metadata (title, description, CTA)
- Matches common CMS pattern of container → items
- More flexible for page composition

### Validation
**Decision:** Added `validation: { isRequired: true }` to most core fields.

**Rationale:**
- Prevents incomplete content from being saved
- Matches TypeScript non-optional fields
- Improves data integrity

## Migration Considerations

If you have existing data in the database, you'll need to:

1. **Rename references:**
   - `FooterPart` → `FooterSection`
   - `Testimonial` → `TestimonialSection`

2. **Add new fields:**
   - Add `certId`, `width`, `height` to existing Certification entries
   - Add `stepId` to existing ApproachStep entries (migrate from `aid`)
   - Add `featureId` to existing Feature entries (migrate from `fid`)
   - Add `icon` to existing HeroBanner entries
   - Add `imageAlt` to PageContent entries with images

3. **Convert relationships to text:**
   - Convert Image relationships to text paths where changed

4. **Update Section references:**
   - Wrap Benefit items in BenefitSection
   - Wrap Certification items in CertificationSection

## Usage Example

```typescript
// Create a page with multiple sections
const page = {
  slug: 'home',
  title: 'Home Page',
  description: 'Welcome to our site',
  sections: [
    {
      type: 'hero',
      contentHero: { /* hero config */ }
    },
    {
      type: 'benefits',
      contentBenefits: {
        title: 'Our Benefits',
        benefits: [/* benefit items */]
      }
    },
    {
      type: 'testimonials',
      contentTestimonials: {
        background: [/* backgrounds */],
        testimonials: [/* testimonial items */]
      }
    }
  ]
}
```

## Future Enhancements

1. **Image Management:** Consider adding file upload support with Keystone's `image` field type
2. **Rich Text:** Add rich text editor for long-form content fields
3. **Preview:** Add preview functionality to see how content renders
4. **Validation:** Add custom validation hooks for complex business rules
5. **Workflow:** Add content approval workflow states
6. **Versioning:** Enable content versioning for rollback capability

## Testing Checklist

- [ ] Verify all types export correctly
- [ ] Test creating each list item type in Keystone Admin UI
- [ ] Verify required field validation works
- [ ] Test relationships between lists
- [ ] Verify select field options match type unions
- [ ] Test page composition with various section types
- [ ] Verify unique slug constraint on PageContent
- [ ] Test language selector with proper options
- [ ] Verify analytics data structure matches frontend expectations
- [ ] Test CTA and navigation link external flag behavior

## Notes

- All lists use `allowAll` access control - update for production security
- `ImageProps` from Next.js imported but primarily for type compatibility
- Icon fields store string identifiers (would reference remix icon map in frontend)
- Float type added for testimonial ratings (requires Keystone 6+ with float field)

---

**Last Updated:** 2024
**Schema Version:** 2.0
**Compatible With:** Keystone 6, Next.js 13+