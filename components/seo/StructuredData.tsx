import Script from 'next/script'

interface OrganizationProps {
  name: string
  url: string
  logo: string
  description: string
  sameAs?: string[]
  address?: {
    streetAddress: string
    addressLocality: string
    addressCountry: string
  }
  contactPoint?: {
    telephone: string
    contactType: string
  }
}

interface WebSiteProps {
  name: string
  url: string
  description: string
}

interface BlogPostingProps {
  headline: string
  image: string
  author: string
  datePublished: string
  dateModified?: string
  description: string
  url: string
}

export function OrganizationStructuredData({
  name,
  url,
  logo,
  description,
  sameAs,
  address,
  contactPoint,
}: OrganizationProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    sameAs: sameAs || [],
    address: address ? {
      '@type': 'PostalAddress',
      ...address,
    } : undefined,
    contactPoint: contactPoint ? {
      '@type': 'ContactPoint',
      ...contactPoint,
    } : undefined,
  }

  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function WebSiteStructuredData({ name, url, description }: WebSiteProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function BlogPostingStructuredData({
  headline,
  image,
  author,
  datePublished,
  dateModified,
  description,
  url,
}: BlogPostingProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    image,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    description,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return (
    <Script
      id="blog-posting-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface BreadcrumbProps {
  items: Array<{ name: string; item: string }>
}

export function BreadcrumbStructuredData({ items }: BreadcrumbProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  }

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
