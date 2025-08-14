{
    'name': 'Custom Action Button in POS',
    'version': '1.0',
    'category': 'Point of Sale',
    'summary': 'Adds a custom Action Button to the POS interface.',
    'author': 'Darrien',
    'depends': ['point_of_sale'],
    'assets': {
        'point_of_sale._assets_pos': [
            'custom-button/static/src/javascript/button.js',
            'custom-button/static/src/xml/button.xml',
        ],
    },
    'installable': True,
    'application': False,
    'license': 'LGPL-3', 
}
