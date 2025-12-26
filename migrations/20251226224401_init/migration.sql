-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "authId" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "label" TEXT,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cta" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL DEFAULT '',
    "href" TEXT NOT NULL DEFAULT '',
    "external" BOOLEAN NOT NULL DEFAULT false,
    "type" INTEGER,
    "language" INTEGER,

    CONSTRAINT "Cta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "src" TEXT NOT NULL DEFAULT '',
    "alt" TEXT NOT NULL DEFAULT '',
    "width" INTEGER,
    "height" INTEGER,
    "fill" BOOLEAN NOT NULL DEFAULT false,
    "type" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestimonialBadge" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL DEFAULT '',
    "label" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "TestimonialBadge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestimonialItem" (
    "id" SERIAL NOT NULL,
    "rating" DOUBLE PRECISION,
    "badge" INTEGER,
    "name" TEXT NOT NULL DEFAULT '',
    "role" TEXT NOT NULL DEFAULT '',
    "company" TEXT NOT NULL DEFAULT '',
    "image" INTEGER,
    "content" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "TestimonialItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestimonialSection" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "fallback" INTEGER,
    "language" INTEGER,

    CONSTRAINT "TestimonialSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroBannerAdditional" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL DEFAULT '',
    "text" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "HeroBannerAdditional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroBanner" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL DEFAULT '',
    "href" TEXT NOT NULL DEFAULT '',
    "external" BOOLEAN NOT NULL DEFAULT false,
    "icon" TEXT NOT NULL DEFAULT '',
    "additional" INTEGER,
    "language" INTEGER,

    CONSTRAINT "HeroBanner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hero" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "subHeading" TEXT NOT NULL DEFAULT '',
    "banner" INTEGER,
    "cta" INTEGER,
    "language" INTEGER,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Benefit" (
    "id" SERIAL NOT NULL,
    "icon" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "Benefit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BenefitSection" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "BenefitSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL DEFAULT '',
    "answer" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaqSection" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "FaqSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "image" INTEGER,
    "link" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertificationSection" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "cta" INTEGER,
    "language" INTEGER,

    CONSTRAINT "CertificationSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" SERIAL NOT NULL,
    "featureId" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "longDescription" TEXT NOT NULL DEFAULT '',
    "visualization" TEXT,
    "language" INTEGER,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApproachStep" (
    "id" SERIAL NOT NULL,
    "stepId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "activityTime" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "ApproachStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Approach" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "Approach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NavigationLink" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL DEFAULT '',
    "href" TEXT NOT NULL DEFAULT '',
    "external" BOOLEAN NOT NULL DEFAULT false,
    "icon" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,
    "type" INTEGER,
    "sectionKey" INTEGER,

    CONSTRAINT "NavigationLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Navigation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "image" INTEGER,
    "cta" INTEGER,
    "language" INTEGER,

    CONSTRAINT "Navigation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FooterSectionKey" (
    "id" SERIAL NOT NULL,
    "label" TEXT,

    CONSTRAINT "FooterSectionKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FooterSection" (
    "id" SERIAL NOT NULL,
    "title" INTEGER,
    "language" INTEGER,

    CONSTRAINT "FooterSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Footer" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "Footer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalyticsStat" (
    "id" SERIAL NOT NULL,
    "totalDeployments" TEXT NOT NULL DEFAULT '',
    "deploymentChange" TEXT NOT NULL DEFAULT '',
    "deploymentChangePercent" TEXT NOT NULL DEFAULT '',
    "changePeriod" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "AnalyticsStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalyticsSummaryItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "deployments" TEXT NOT NULL DEFAULT '',
    "uptime" TEXT NOT NULL DEFAULT '',
    "clientSatisfaction" TEXT NOT NULL DEFAULT '',
    "efficiency" TEXT NOT NULL DEFAULT '',
    "revenueGrowth" TEXT NOT NULL DEFAULT '',
    "bgColor" TEXT NOT NULL DEFAULT '',
    "changeType" TEXT NOT NULL,
    "language" INTEGER,

    CONSTRAINT "AnalyticsSummaryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analytic" (
    "id" SERIAL NOT NULL,
    "heading" TEXT NOT NULL DEFAULT '',
    "subheading" TEXT NOT NULL DEFAULT '',
    "stats" INTEGER,
    "tableHeadings" JSONB NOT NULL DEFAULT '[]',
    "language" INTEGER,

    CONSTRAINT "Analytic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Value" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "icon" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "Value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "About" (
    "id" SERIAL NOT NULL,
    "heading" TEXT NOT NULL DEFAULT '',
    "intro" TEXT NOT NULL DEFAULT '',
    "valuesTitle" TEXT NOT NULL DEFAULT '',
    "closing" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Map" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "subheading" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CtaSection" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "CtaSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageContent" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "image" INTEGER,
    "cta" INTEGER,
    "sections" INTEGER,
    "language" INTEGER,

    CONSTRAINT "PageContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CtaSection_ctas" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TestimonialSection_background" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TestimonialSection_testimonials" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Section_contentHero" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BenefitSection_benefits" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Section_contentBenefits" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FaqSection_faqs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Section_contentFaqSection" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CertificationSection_certifications" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Section_contentCertifications" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Section_contentFeatures" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Approach_steps" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Section_contentApproach" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Navigation_items" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Section_contentNavigation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FooterSection_items" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Footer_sections" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Section_contentFooter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Analytic_summary" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Section_contentAnalytics" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_About_values" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Section_contentAbout" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Section_contentMap" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CtaSection_background" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Section_contentCta" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Section_contentTestimonials" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Cta_type_idx" ON "Cta"("type");

-- CreateIndex
CREATE INDEX "Cta_language_idx" ON "Cta"("language");

-- CreateIndex
CREATE INDEX "Image_type_idx" ON "Image"("type");

-- CreateIndex
CREATE INDEX "TestimonialBadge_language_idx" ON "TestimonialBadge"("language");

-- CreateIndex
CREATE INDEX "TestimonialItem_badge_idx" ON "TestimonialItem"("badge");

-- CreateIndex
CREATE INDEX "TestimonialItem_image_idx" ON "TestimonialItem"("image");

-- CreateIndex
CREATE INDEX "TestimonialItem_language_idx" ON "TestimonialItem"("language");

-- CreateIndex
CREATE INDEX "TestimonialSection_fallback_idx" ON "TestimonialSection"("fallback");

-- CreateIndex
CREATE INDEX "TestimonialSection_language_idx" ON "TestimonialSection"("language");

-- CreateIndex
CREATE INDEX "HeroBannerAdditional_language_idx" ON "HeroBannerAdditional"("language");

-- CreateIndex
CREATE INDEX "HeroBanner_additional_idx" ON "HeroBanner"("additional");

-- CreateIndex
CREATE INDEX "HeroBanner_language_idx" ON "HeroBanner"("language");

-- CreateIndex
CREATE INDEX "Hero_banner_idx" ON "Hero"("banner");

-- CreateIndex
CREATE INDEX "Hero_cta_idx" ON "Hero"("cta");

-- CreateIndex
CREATE INDEX "Hero_language_idx" ON "Hero"("language");

-- CreateIndex
CREATE INDEX "Benefit_language_idx" ON "Benefit"("language");

-- CreateIndex
CREATE INDEX "BenefitSection_language_idx" ON "BenefitSection"("language");

-- CreateIndex
CREATE INDEX "Faq_language_idx" ON "Faq"("language");

-- CreateIndex
CREATE INDEX "FaqSection_language_idx" ON "FaqSection"("language");

-- CreateIndex
CREATE INDEX "Certification_image_idx" ON "Certification"("image");

-- CreateIndex
CREATE INDEX "Certification_language_idx" ON "Certification"("language");

-- CreateIndex
CREATE INDEX "CertificationSection_cta_idx" ON "CertificationSection"("cta");

-- CreateIndex
CREATE INDEX "CertificationSection_language_idx" ON "CertificationSection"("language");

-- CreateIndex
CREATE INDEX "Feature_language_idx" ON "Feature"("language");

-- CreateIndex
CREATE INDEX "ApproachStep_language_idx" ON "ApproachStep"("language");

-- CreateIndex
CREATE INDEX "Approach_language_idx" ON "Approach"("language");

-- CreateIndex
CREATE INDEX "NavigationLink_language_idx" ON "NavigationLink"("language");

-- CreateIndex
CREATE INDEX "NavigationLink_type_idx" ON "NavigationLink"("type");

-- CreateIndex
CREATE INDEX "NavigationLink_sectionKey_idx" ON "NavigationLink"("sectionKey");

-- CreateIndex
CREATE INDEX "Navigation_image_idx" ON "Navigation"("image");

-- CreateIndex
CREATE INDEX "Navigation_cta_idx" ON "Navigation"("cta");

-- CreateIndex
CREATE INDEX "Navigation_language_idx" ON "Navigation"("language");

-- CreateIndex
CREATE INDEX "FooterSection_title_idx" ON "FooterSection"("title");

-- CreateIndex
CREATE INDEX "FooterSection_language_idx" ON "FooterSection"("language");

-- CreateIndex
CREATE INDEX "Footer_language_idx" ON "Footer"("language");

-- CreateIndex
CREATE INDEX "AnalyticsStat_language_idx" ON "AnalyticsStat"("language");

-- CreateIndex
CREATE INDEX "AnalyticsSummaryItem_language_idx" ON "AnalyticsSummaryItem"("language");

-- CreateIndex
CREATE INDEX "Analytic_stats_idx" ON "Analytic"("stats");

-- CreateIndex
CREATE INDEX "Analytic_language_idx" ON "Analytic"("language");

-- CreateIndex
CREATE INDEX "Value_language_idx" ON "Value"("language");

-- CreateIndex
CREATE INDEX "About_language_idx" ON "About"("language");

-- CreateIndex
CREATE INDEX "Map_language_idx" ON "Map"("language");

-- CreateIndex
CREATE INDEX "CtaSection_language_idx" ON "CtaSection"("language");

-- CreateIndex
CREATE UNIQUE INDEX "PageContent_slug_key" ON "PageContent"("slug");

-- CreateIndex
CREATE INDEX "PageContent_image_idx" ON "PageContent"("image");

-- CreateIndex
CREATE INDEX "PageContent_cta_idx" ON "PageContent"("cta");

-- CreateIndex
CREATE INDEX "PageContent_sections_idx" ON "PageContent"("sections");

-- CreateIndex
CREATE INDEX "PageContent_language_idx" ON "PageContent"("language");

-- CreateIndex
CREATE UNIQUE INDEX "_CtaSection_ctas_AB_unique" ON "_CtaSection_ctas"("A", "B");

-- CreateIndex
CREATE INDEX "_CtaSection_ctas_B_index" ON "_CtaSection_ctas"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TestimonialSection_background_AB_unique" ON "_TestimonialSection_background"("A", "B");

-- CreateIndex
CREATE INDEX "_TestimonialSection_background_B_index" ON "_TestimonialSection_background"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TestimonialSection_testimonials_AB_unique" ON "_TestimonialSection_testimonials"("A", "B");

-- CreateIndex
CREATE INDEX "_TestimonialSection_testimonials_B_index" ON "_TestimonialSection_testimonials"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Section_contentHero_AB_unique" ON "_Section_contentHero"("A", "B");

-- CreateIndex
CREATE INDEX "_Section_contentHero_B_index" ON "_Section_contentHero"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BenefitSection_benefits_AB_unique" ON "_BenefitSection_benefits"("A", "B");

-- CreateIndex
CREATE INDEX "_BenefitSection_benefits_B_index" ON "_BenefitSection_benefits"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Section_contentBenefits_AB_unique" ON "_Section_contentBenefits"("A", "B");

-- CreateIndex
CREATE INDEX "_Section_contentBenefits_B_index" ON "_Section_contentBenefits"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FaqSection_faqs_AB_unique" ON "_FaqSection_faqs"("A", "B");

-- CreateIndex
CREATE INDEX "_FaqSection_faqs_B_index" ON "_FaqSection_faqs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Section_contentFaqSection_AB_unique" ON "_Section_contentFaqSection"("A", "B");

-- CreateIndex
CREATE INDEX "_Section_contentFaqSection_B_index" ON "_Section_contentFaqSection"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CertificationSection_certifications_AB_unique" ON "_CertificationSection_certifications"("A", "B");

-- CreateIndex
CREATE INDEX "_CertificationSection_certifications_B_index" ON "_CertificationSection_certifications"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Section_contentCertifications_AB_unique" ON "_Section_contentCertifications"("A", "B");

-- CreateIndex
CREATE INDEX "_Section_contentCertifications_B_index" ON "_Section_contentCertifications"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Section_contentFeatures_AB_unique" ON "_Section_contentFeatures"("A", "B");

-- CreateIndex
CREATE INDEX "_Section_contentFeatures_B_index" ON "_Section_contentFeatures"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Approach_steps_AB_unique" ON "_Approach_steps"("A", "B");

-- CreateIndex
CREATE INDEX "_Approach_steps_B_index" ON "_Approach_steps"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Section_contentApproach_AB_unique" ON "_Section_contentApproach"("A", "B");

-- CreateIndex
CREATE INDEX "_Section_contentApproach_B_index" ON "_Section_contentApproach"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Navigation_items_AB_unique" ON "_Navigation_items"("A", "B");

-- CreateIndex
CREATE INDEX "_Navigation_items_B_index" ON "_Navigation_items"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Section_contentNavigation_AB_unique" ON "_Section_contentNavigation"("A", "B");

-- CreateIndex
CREATE INDEX "_Section_contentNavigation_B_index" ON "_Section_contentNavigation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FooterSection_items_AB_unique" ON "_FooterSection_items"("A", "B");

-- CreateIndex
CREATE INDEX "_FooterSection_items_B_index" ON "_FooterSection_items"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Footer_sections_AB_unique" ON "_Footer_sections"("A", "B");

-- CreateIndex
CREATE INDEX "_Footer_sections_B_index" ON "_Footer_sections"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Section_contentFooter_AB_unique" ON "_Section_contentFooter"("A", "B");

-- CreateIndex
CREATE INDEX "_Section_contentFooter_B_index" ON "_Section_contentFooter"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Analytic_summary_AB_unique" ON "_Analytic_summary"("A", "B");

-- CreateIndex
CREATE INDEX "_Analytic_summary_B_index" ON "_Analytic_summary"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Section_contentAnalytics_AB_unique" ON "_Section_contentAnalytics"("A", "B");

-- CreateIndex
CREATE INDEX "_Section_contentAnalytics_B_index" ON "_Section_contentAnalytics"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_About_values_AB_unique" ON "_About_values"("A", "B");

-- CreateIndex
CREATE INDEX "_About_values_B_index" ON "_About_values"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Section_contentAbout_AB_unique" ON "_Section_contentAbout"("A", "B");

-- CreateIndex
CREATE INDEX "_Section_contentAbout_B_index" ON "_Section_contentAbout"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Section_contentMap_AB_unique" ON "_Section_contentMap"("A", "B");

-- CreateIndex
CREATE INDEX "_Section_contentMap_B_index" ON "_Section_contentMap"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CtaSection_background_AB_unique" ON "_CtaSection_background"("A", "B");

-- CreateIndex
CREATE INDEX "_CtaSection_background_B_index" ON "_CtaSection_background"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Section_contentCta_AB_unique" ON "_Section_contentCta"("A", "B");

-- CreateIndex
CREATE INDEX "_Section_contentCta_B_index" ON "_Section_contentCta"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Section_contentTestimonials_AB_unique" ON "_Section_contentTestimonials"("A", "B");

-- CreateIndex
CREATE INDEX "_Section_contentTestimonials_B_index" ON "_Section_contentTestimonials"("B");

-- AddForeignKey
ALTER TABLE "Cta" ADD CONSTRAINT "Cta_type_fkey" FOREIGN KEY ("type") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cta" ADD CONSTRAINT "Cta_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_type_fkey" FOREIGN KEY ("type") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestimonialBadge" ADD CONSTRAINT "TestimonialBadge_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestimonialItem" ADD CONSTRAINT "TestimonialItem_badge_fkey" FOREIGN KEY ("badge") REFERENCES "TestimonialBadge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestimonialItem" ADD CONSTRAINT "TestimonialItem_image_fkey" FOREIGN KEY ("image") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestimonialItem" ADD CONSTRAINT "TestimonialItem_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestimonialSection" ADD CONSTRAINT "TestimonialSection_fallback_fkey" FOREIGN KEY ("fallback") REFERENCES "TestimonialItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestimonialSection" ADD CONSTRAINT "TestimonialSection_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeroBannerAdditional" ADD CONSTRAINT "HeroBannerAdditional_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeroBanner" ADD CONSTRAINT "HeroBanner_additional_fkey" FOREIGN KEY ("additional") REFERENCES "HeroBannerAdditional"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeroBanner" ADD CONSTRAINT "HeroBanner_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hero" ADD CONSTRAINT "Hero_banner_fkey" FOREIGN KEY ("banner") REFERENCES "HeroBanner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hero" ADD CONSTRAINT "Hero_cta_fkey" FOREIGN KEY ("cta") REFERENCES "Cta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hero" ADD CONSTRAINT "Hero_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Benefit" ADD CONSTRAINT "Benefit_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BenefitSection" ADD CONSTRAINT "BenefitSection_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faq" ADD CONSTRAINT "Faq_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaqSection" ADD CONSTRAINT "FaqSection_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_image_fkey" FOREIGN KEY ("image") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificationSection" ADD CONSTRAINT "CertificationSection_cta_fkey" FOREIGN KEY ("cta") REFERENCES "Cta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificationSection" ADD CONSTRAINT "CertificationSection_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApproachStep" ADD CONSTRAINT "ApproachStep_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Approach" ADD CONSTRAINT "Approach_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NavigationLink" ADD CONSTRAINT "NavigationLink_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NavigationLink" ADD CONSTRAINT "NavigationLink_type_fkey" FOREIGN KEY ("type") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NavigationLink" ADD CONSTRAINT "NavigationLink_sectionKey_fkey" FOREIGN KEY ("sectionKey") REFERENCES "FooterSectionKey"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Navigation" ADD CONSTRAINT "Navigation_image_fkey" FOREIGN KEY ("image") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Navigation" ADD CONSTRAINT "Navigation_cta_fkey" FOREIGN KEY ("cta") REFERENCES "Cta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Navigation" ADD CONSTRAINT "Navigation_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FooterSection" ADD CONSTRAINT "FooterSection_title_fkey" FOREIGN KEY ("title") REFERENCES "FooterSectionKey"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FooterSection" ADD CONSTRAINT "FooterSection_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Footer" ADD CONSTRAINT "Footer_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalyticsStat" ADD CONSTRAINT "AnalyticsStat_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalyticsSummaryItem" ADD CONSTRAINT "AnalyticsSummaryItem_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytic" ADD CONSTRAINT "Analytic_stats_fkey" FOREIGN KEY ("stats") REFERENCES "AnalyticsStat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytic" ADD CONSTRAINT "Analytic_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Value" ADD CONSTRAINT "Value_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "About" ADD CONSTRAINT "About_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Map" ADD CONSTRAINT "Map_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CtaSection" ADD CONSTRAINT "CtaSection_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageContent" ADD CONSTRAINT "PageContent_image_fkey" FOREIGN KEY ("image") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageContent" ADD CONSTRAINT "PageContent_cta_fkey" FOREIGN KEY ("cta") REFERENCES "Cta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageContent" ADD CONSTRAINT "PageContent_sections_fkey" FOREIGN KEY ("sections") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageContent" ADD CONSTRAINT "PageContent_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CtaSection_ctas" ADD CONSTRAINT "_CtaSection_ctas_A_fkey" FOREIGN KEY ("A") REFERENCES "Cta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CtaSection_ctas" ADD CONSTRAINT "_CtaSection_ctas_B_fkey" FOREIGN KEY ("B") REFERENCES "CtaSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TestimonialSection_background" ADD CONSTRAINT "_TestimonialSection_background_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TestimonialSection_background" ADD CONSTRAINT "_TestimonialSection_background_B_fkey" FOREIGN KEY ("B") REFERENCES "TestimonialSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TestimonialSection_testimonials" ADD CONSTRAINT "_TestimonialSection_testimonials_A_fkey" FOREIGN KEY ("A") REFERENCES "TestimonialItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TestimonialSection_testimonials" ADD CONSTRAINT "_TestimonialSection_testimonials_B_fkey" FOREIGN KEY ("B") REFERENCES "TestimonialSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentHero" ADD CONSTRAINT "_Section_contentHero_A_fkey" FOREIGN KEY ("A") REFERENCES "Hero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentHero" ADD CONSTRAINT "_Section_contentHero_B_fkey" FOREIGN KEY ("B") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BenefitSection_benefits" ADD CONSTRAINT "_BenefitSection_benefits_A_fkey" FOREIGN KEY ("A") REFERENCES "Benefit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BenefitSection_benefits" ADD CONSTRAINT "_BenefitSection_benefits_B_fkey" FOREIGN KEY ("B") REFERENCES "BenefitSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentBenefits" ADD CONSTRAINT "_Section_contentBenefits_A_fkey" FOREIGN KEY ("A") REFERENCES "BenefitSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentBenefits" ADD CONSTRAINT "_Section_contentBenefits_B_fkey" FOREIGN KEY ("B") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FaqSection_faqs" ADD CONSTRAINT "_FaqSection_faqs_A_fkey" FOREIGN KEY ("A") REFERENCES "Faq"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FaqSection_faqs" ADD CONSTRAINT "_FaqSection_faqs_B_fkey" FOREIGN KEY ("B") REFERENCES "FaqSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentFaqSection" ADD CONSTRAINT "_Section_contentFaqSection_A_fkey" FOREIGN KEY ("A") REFERENCES "FaqSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentFaqSection" ADD CONSTRAINT "_Section_contentFaqSection_B_fkey" FOREIGN KEY ("B") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CertificationSection_certifications" ADD CONSTRAINT "_CertificationSection_certifications_A_fkey" FOREIGN KEY ("A") REFERENCES "Certification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CertificationSection_certifications" ADD CONSTRAINT "_CertificationSection_certifications_B_fkey" FOREIGN KEY ("B") REFERENCES "CertificationSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentCertifications" ADD CONSTRAINT "_Section_contentCertifications_A_fkey" FOREIGN KEY ("A") REFERENCES "CertificationSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentCertifications" ADD CONSTRAINT "_Section_contentCertifications_B_fkey" FOREIGN KEY ("B") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentFeatures" ADD CONSTRAINT "_Section_contentFeatures_A_fkey" FOREIGN KEY ("A") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentFeatures" ADD CONSTRAINT "_Section_contentFeatures_B_fkey" FOREIGN KEY ("B") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Approach_steps" ADD CONSTRAINT "_Approach_steps_A_fkey" FOREIGN KEY ("A") REFERENCES "Approach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Approach_steps" ADD CONSTRAINT "_Approach_steps_B_fkey" FOREIGN KEY ("B") REFERENCES "ApproachStep"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentApproach" ADD CONSTRAINT "_Section_contentApproach_A_fkey" FOREIGN KEY ("A") REFERENCES "Approach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentApproach" ADD CONSTRAINT "_Section_contentApproach_B_fkey" FOREIGN KEY ("B") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Navigation_items" ADD CONSTRAINT "_Navigation_items_A_fkey" FOREIGN KEY ("A") REFERENCES "Navigation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Navigation_items" ADD CONSTRAINT "_Navigation_items_B_fkey" FOREIGN KEY ("B") REFERENCES "NavigationLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentNavigation" ADD CONSTRAINT "_Section_contentNavigation_A_fkey" FOREIGN KEY ("A") REFERENCES "Navigation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentNavigation" ADD CONSTRAINT "_Section_contentNavigation_B_fkey" FOREIGN KEY ("B") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FooterSection_items" ADD CONSTRAINT "_FooterSection_items_A_fkey" FOREIGN KEY ("A") REFERENCES "FooterSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FooterSection_items" ADD CONSTRAINT "_FooterSection_items_B_fkey" FOREIGN KEY ("B") REFERENCES "NavigationLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Footer_sections" ADD CONSTRAINT "_Footer_sections_A_fkey" FOREIGN KEY ("A") REFERENCES "Footer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Footer_sections" ADD CONSTRAINT "_Footer_sections_B_fkey" FOREIGN KEY ("B") REFERENCES "FooterSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentFooter" ADD CONSTRAINT "_Section_contentFooter_A_fkey" FOREIGN KEY ("A") REFERENCES "Footer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentFooter" ADD CONSTRAINT "_Section_contentFooter_B_fkey" FOREIGN KEY ("B") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Analytic_summary" ADD CONSTRAINT "_Analytic_summary_A_fkey" FOREIGN KEY ("A") REFERENCES "Analytic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Analytic_summary" ADD CONSTRAINT "_Analytic_summary_B_fkey" FOREIGN KEY ("B") REFERENCES "AnalyticsSummaryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentAnalytics" ADD CONSTRAINT "_Section_contentAnalytics_A_fkey" FOREIGN KEY ("A") REFERENCES "Analytic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentAnalytics" ADD CONSTRAINT "_Section_contentAnalytics_B_fkey" FOREIGN KEY ("B") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_About_values" ADD CONSTRAINT "_About_values_A_fkey" FOREIGN KEY ("A") REFERENCES "About"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_About_values" ADD CONSTRAINT "_About_values_B_fkey" FOREIGN KEY ("B") REFERENCES "Value"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentAbout" ADD CONSTRAINT "_Section_contentAbout_A_fkey" FOREIGN KEY ("A") REFERENCES "About"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentAbout" ADD CONSTRAINT "_Section_contentAbout_B_fkey" FOREIGN KEY ("B") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentMap" ADD CONSTRAINT "_Section_contentMap_A_fkey" FOREIGN KEY ("A") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentMap" ADD CONSTRAINT "_Section_contentMap_B_fkey" FOREIGN KEY ("B") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CtaSection_background" ADD CONSTRAINT "_CtaSection_background_A_fkey" FOREIGN KEY ("A") REFERENCES "CtaSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CtaSection_background" ADD CONSTRAINT "_CtaSection_background_B_fkey" FOREIGN KEY ("B") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentCta" ADD CONSTRAINT "_Section_contentCta_A_fkey" FOREIGN KEY ("A") REFERENCES "CtaSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentCta" ADD CONSTRAINT "_Section_contentCta_B_fkey" FOREIGN KEY ("B") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentTestimonials" ADD CONSTRAINT "_Section_contentTestimonials_A_fkey" FOREIGN KEY ("A") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Section_contentTestimonials" ADD CONSTRAINT "_Section_contentTestimonials_B_fkey" FOREIGN KEY ("B") REFERENCES "TestimonialSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
