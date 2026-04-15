export interface BlogData {
    categories: string[];
    content: string;
    createdAt: string;
    faq: string | null;
    featureImage: number;
    id: number;
    images: Image;
    isDelete: boolean;
    metaRobot: string;
    schema: string[];
    seoDescription: string;
    seoTitle: string;
    slug: string;
    subType: string;
    template: string;
    title: string;
    type: string;
    uniqId: string;
    updatedAt: string;
    updatedBy?: User; 
    user: User;
  }
  
  export interface Image {
    altTag: string;
    caption: string;
    createdAt: string;
    description: string;
    id: number;
    image: string;
    isDelete: boolean;
    title: string;
    updatedAt: string;
    userId: number;
  }
  
  export interface User {
    createdAt: string;
    email: string;
    id: number;
    isDelete: boolean;
    last_login: string;
    mobile: string;
    name: string;
    password: string;
    permission: Permission[];
    profile: string;
    role: string;
    status: string;
    token: string;
    updatedAt: string;
    userId: number;
  }
  
  export interface Permission {
    moduleName: string;
    moduleValue: boolean;
    view: boolean;
    edit: boolean;
    add: boolean;
    delete: boolean;
  }
  export interface Blog {
    id: number;
    title: string;
    excerpt: string;
    imageUrl?: string;
    slug: string;
  }
  export interface SliderSettings {
    infinite: boolean;
    slidesToShow: number;
    slidesToScroll: number;
    dots: boolean;
    arrows: boolean;
    autoplay: boolean;
    autoplaySpeed: number;
  }
  export interface ImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
  }