import { CompositeValidator } from './validators/compositeValidator';
import { checkAccess } from './accessControl/checkAccess';
import { Article } from './models/article';
import { Product } from './models/product';
import { ContentOperations } from './operations/contentOperations';
import { Versioned } from './types/versioned';
import { AccessControl } from './accessControl/accessControl';
import { articleValidator } from './validators/articleValidator';
import { productValidator } from './validators/productValidator';

const article: Article = {
  id: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'draft',
  title: 'Article',
  content: 'Very long article',
  author: 'Sergo',
};

const product: Product = {
  id: '2',
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'published',
  name: 'Product',
  price: 428,
  description: 'Big product',
  stock: 40,
};

const articleValidationResult = articleValidator.validate(article);
console.log('Article Validation:', articleValidationResult);

const productValidationResult = productValidator.validate(product);
console.log('Product Validation:', productValidationResult);

const compositeArticleValidator = new CompositeValidator<Article>();
compositeArticleValidator.addValidator(articleValidator);
const compositeProductValidator = new CompositeValidator<Product>();
compositeProductValidator.addValidator(productValidator);

console.log(
  'Composite Validation (Article):',
  compositeArticleValidator.validate(article)
);
console.log(
  'Composite Validation (Product):',
  compositeProductValidator.validate(product)
);

const articleOps: ContentOperations<Article> = {
  create: (item) => ({ ...item }),
  read: (id) => (id === '1' ? article : null),
  update: (id, data) => (id === '1' ? { ...article, ...data } : null),
  delete: (id) => id === '1',
};

console.log('Create Article:', articleOps.create(article));
console.log('Read Article:', articleOps.read('1'));
console.log('Update Article:', articleOps.update('1', { title: 'Article2' }));
console.log('Delete Article:', articleOps.delete('1'));

const versionedArticle: Versioned<Article> = {
  ...article,
  version: 1,
  previousVersions: [],
};

console.log('Versioned Article:', versionedArticle);

const articleAccessControl: AccessControl<Article> = {
  admin: {
    create: true,
    read: true,
    update: true,
    delete: true,
  },
  editor: {
    create: true,
    read: true,
    update: true,
    delete: false,
    },
  viewer: {
    create: false,
    read: true,
    update: false,
    delete: false,
  },
};

console.log('Admin can create article:', checkAccess(articleAccessControl, 'admin', 'create'));
console.log('Editor can delete article:', checkAccess(articleAccessControl, 'editor', 'delete'));
console.log('Viewer can read article:', checkAccess(articleAccessControl, 'viewer', 'read'));
console.log('Viewer can create article:', checkAccess(articleAccessControl, 'viewer', 'create'));