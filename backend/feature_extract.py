import re
import socket
import requests
import numpy as np
import pandas as pd
from urllib.parse import urlparse, parse_qs
from bs4 import BeautifulSoup

# Example list of sensitive words (you can expand this)
SENSITIVE_WORDS = [
    'login', 'secure', 'bank', 'account', 'update', 'verify',
    'password', 'signin', 'confirm', 'ebayisapi', 'paypal'
]

# Example list of brand names (for EmbeddedBrandName)
BRAND_NAMES = [
    'google', 'facebook', 'amazon', 'apple', 'microsoft', 'paypal'
]

def extract_url_features(url):
    features = {}

    parsed = urlparse(url)
    hostname = parsed.hostname or ''
    path = parsed.path or ''
    query = parsed.query or ''

    # --- Lexical Features ---
    features['NumDots'] = hostname.count('.')
    features['SubdomainLevel'] = max(0, features['NumDots'] - 1)
    features['PathLevel'] = path.count('/')
    features['UrlLength'] = len(url)
    features['HostnameLength'] = len(hostname)
    features['PathLength'] = len(path)
    features['QueryLength'] = len(query)
    features['NumDash'] = url.count('-')
    features['NumDashInHostname'] = hostname.count('-')
    features['AtSymbol'] = 1 if '@' in url else 0
    features['TildeSymbol'] = 1 if '~' in url else 0
    features['NumUnderscore'] = url.count('_')
    features['NumPercent'] = url.count('%')
    features['NumQueryComponents'] = len(parse_qs(query))
    features['NumAmpersand'] = url.count('&')
    features['NumHash'] = url.count('#')
    features['NumNumericChars'] = sum(c.isdigit() for c in url)
    features['DoubleSlashInPath'] = 1 if '//' in path else 0
    features['NoHttps'] = 1 if not url.lower().startswith('https') else 0
    features['HttpsInHostname'] = 1 if 'https' in hostname else 0

    # --- IP Address detection ---
    try:
        socket.inet_aton(hostname)
        features['IpAddress'] = 1
    except:
        features['IpAddress'] = 0

    # --- Random String heuristic (based on long random segments) ---
    long_segments = [seg for seg in hostname.split('.') if len(seg) > 10 and not re.search(r'[aeiou]', seg)]
    features['RandomString'] = 1 if long_segments else 0

    # --- Domain in subdomains/paths ---
    main_domain = hostname.split('.')[-2] if len(hostname.split('.')) > 1 else hostname
    features['DomainInSubdomains'] = 1 if any(main_domain in sub for sub in hostname.split('.')[:-2]) else 0
    features['DomainInPaths'] = 1 if main_domain in path else 0

    # --- Sensitive Words ---
    features['NumSensitiveWords'] = sum(word in url.lower() for word in SENSITIVE_WORDS)

    # --- Embedded Brand Name ---
    features['EmbeddedBrandName'] = 1 if any(b in url.lower() for b in BRAND_NAMES) else 0

    # --- HTML-based features ---
    try:
        r = requests.get(url, timeout=5)
        html = r.text.lower()
        soup = BeautifulSoup(html, 'html.parser')

        features['IframeOrFrame'] = 1 if ('<iframe' in html or '<frame' in html) else 0
        features['SubmitInfoToEmail'] = 1 if 'mailto:' in html else 0

        forms = soup.find_all('form')
        features['InsecureForms'] = 0
        features['RelativeFormAction'] = 0
        features['ExtFormAction'] = 0
        features['AbnormalFormAction'] = 0
        for form in forms:
            action = form.get('action') or ''
            if action.startswith('http:'):
                features['InsecureForms'] = 1
            if action.startswith('/'):
                features['RelativeFormAction'] = 1
            if '://' in action and parsed.netloc not in action:
                features['ExtFormAction'] = 1
            if action == '':
                features['AbnormalFormAction'] = 1

        features['MissingTitle'] = 1 if not soup.title or not soup.title.string else 0

        favicons = [link for link in soup.find_all('link') if 'icon' in str(link.get('rel'))]
        features['ExtFavicon'] = 1 if any(parsed.netloc not in f.get('href', '') for f in favicons) else 0

    except Exception:
        # If page not fetched, set HTML-based features to 0
        html_features = ['IframeOrFrame','SubmitInfoToEmail','InsecureForms','RelativeFormAction',
                         'ExtFormAction','AbnormalFormAction','MissingTitle','ExtFavicon']
        for f in html_features:
            features[f] = 0

    return pd.DataFrame([features])


# data=extract_url_features("https://booly.kr/jaBLsf")
# print(data)
