import random
import requests
import os
from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from products.models import Category, Brand, Product, ProductImage, Review
from django.utils.text import slugify

class Command(BaseCommand):
    help = 'Populates the database with sample shoe data and public images'

    def handle(self, *args, **kwargs):
        self.stdout.write('Populating data with public images...')

        # Categories
        categories_data = [
            {'name': 'Running', 'description': 'Performance running shoes for all terrains'},
            {'name': 'Basketball', 'description': 'High-top shoes for maximum court performance'},
            {'name': 'Casual', 'description': 'Everyday sneakers for comfort and style'},
            {'name': 'Training', 'description': 'Versatile shoes for gym and cross-training'},
            {'name': 'Skateboarding', 'description': 'Durable shoes with excellent board feel'}
        ]

        categories = {}
        for cat in categories_data:
            obj, created = Category.objects.get_or_create(
                name=cat['name'],
                defaults={'description': cat['description']}
            )
            categories[cat['name']] = obj

        # Brands with public logos
        brands_data = [
            {'name': 'Nike', 'description': 'Just Do It', 'image_url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/400px-Logo_NIKE.svg.png'},
            {'name': 'Adidas', 'description': 'Impossible Is Nothing', 'image_url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/400px-Adidas_Logo.svg.png'},
            {'name': 'Puma', 'description': 'Forever Faster', 'image_url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Puma_Logo.svg/400px-Puma_Logo.svg.png'},
            {'name': 'Reebok', 'description': 'Be More Human', 'image_url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Reebok_Logo.svg/400px-Reebok_Logo.svg.png'},
            {'name': 'New Balance', 'description': 'Fearlessly Independent Since 1906', 'image_url': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/New_Balance_logo.svg/400px-New_Balance_logo.svg.png'}
        ]

        brands = {}
        for b_data in brands_data:
            obj, created = Brand.objects.get_or_create(
                name=b_data['name'],
                defaults={'description': b_data['description']}
            )
            if not obj.logo:
                try:
                    self.stdout.write(f'Downloading logo for {b_data["name"]}...')
                    response = requests.get(b_data['image_url'])
                    if response.status_code == 200:
                        file_name = f"{slugify(b_data['name'])}_logo.png"
                        obj.logo.save(file_name, ContentFile(response.content), save=True)
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f'Error downloading logo for {b_data["name"]}: {e}'))
            brands[b_data['name']] = obj

        # Products with Public Image URLs
        products_data = [
            {
                'name': 'Nike Air Max 270',
                'description': 'The Nike Air Max 270 is Nike\'s first lifestyle Air Max, bringing you style, comfort and big attitude.',
                'price': 150.00,
                'category': 'Casual',
                'brand': 'Nike',
                'sizes': [38, 39, 40, 41, 42, 43, 44, 45],
                'colors': ['Black/White', 'Red/Black'],
                'image_url': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'
            },
            {
                'name': 'Adidas Ultraboost 22',
                'description': 'A little extra push. These running shoes give you comfort and responsiveness at every pace and distance.',
                'price': 190.00,
                'category': 'Running',
                'brand': 'Adidas',
                'sizes': [37, 38, 39, 40, 41, 42, 43],
                'colors': ['Grey', 'White'],
                'image_url': 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&q=80&w=800'
            },
            {
                'name': 'Puma RS-X3',
                'description': 'X marks extreme. RS-X takes the signature RS design and dials it up to the third power.',
                'price': 110.00,
                'category': 'Casual',
                'brand': 'Puma',
                'sizes': [39, 40, 41, 42, 43, 44],
                'colors': ['White/Blue', 'White/Grey'],
                'image_url': 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800'
            },
            {
                'name': 'Nike Giannis Immortality',
                'description': 'Smooth performance for the multidimensional player. The Giannis Immortality is a game shoe for intensity.',
                'price': 85.00,
                'category': 'Basketball',
                'brand': 'Nike',
                'sizes': [40, 41, 42, 43, 44, 45],
                'colors': ['Black/Green'],
                'image_url': 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=800'
            },
            {
                'name': 'New Balance 574',
                'description': 'The most New Balance shoe ever. Built to be a reliable shoe that could do a lot of things well.',
                'price': 85.00,
                'category': 'Casual',
                'brand': 'New Balance',
                'sizes': [38, 39, 40, 41, 42],
                'colors': ['Navy', 'Grey'],
                'image_url': 'https://images.unsplash.com/photo-1534653218114-c139a047053e?auto=format&fit=crop&q=80&w=800'
            },
            {
                'name': 'Reebok Nano X2',
                'description': 'Your favorite training shoe is back. The Nano X2 is built for all the ways you move.',
                'price': 135.00,
                'category': 'Training',
                'brand': 'Reebok',
                'sizes': [38, 39, 40, 41, 42],
                'colors': ['Black/Gum'],
                'image_url': 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800'
            }
        ]

        for prod in products_data:
            p, created = Product.objects.get_or_create(
                name=prod['name'],
                defaults={
                    'description': prod['description'],
                    'price': prod['price'],
                    'category': categories[prod['category']],
                    'brand': brands[prod['brand']],
                    'stock': random.randint(10, 50),
                    'sizes': prod['sizes'],
                    'colors': prod['colors']
                }
            )
            
            # Add images if they don't exist
            if not p.images.exists():
                try:
                    self.stdout.write(f'Downloading image for {prod["name"]}...')
                    response = requests.get(prod['image_url'])
                    if response.status_code == 200:
                        file_name = f"{slugify(prod['name'])}.jpg"
                        img_obj = ProductImage(product=p, is_primary=True)
                        img_obj.image.save(file_name, ContentFile(response.content), save=True)
                        self.stdout.write(self.style.SUCCESS(f'Successfully added image for {prod["name"]}'))
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f'Error downloading image for {prod["name"]}: {e}'))

            # Add reviews
            if not p.reviews.exists():
                users = ['Alice', 'Bob', 'Charlie', 'David', 'Eva']
                comments = [
                    'Great shoes, very comfortable!',
                    'Perfect fit and amazing style.',
                    'A bit tight at first but broke in nicely.',
                    'Excellent quality for the price.',
                    'Not what I expected, but still good.'
                ]
                for _ in range(random.randint(2, 4)):
                    Review.objects.create(
                        product=p,
                        user_name=random.choice(users),
                        rating=random.randint(4, 5),
                        comment=random.choice(comments)
                    )

        self.stdout.write(self.style.SUCCESS('Successfully populated database with products and images'))
