import os
import instaloader
import requests

def download_avatar(username, output_dir):
    # Disable retries to avoid hanging on 401
    L = instaloader.Instaloader(fatal_status_codes=[401, 404, 429])
    try:
        profile = instaloader.Profile.from_username(L.context, username)
        url = profile.profile_pic_url
        print(f"[{username}] Found URL: {url[:30]}...")
        
        # Download image
        response = requests.get(url)
        if response.status_code == 200:
            filepath = os.path.join(output_dir, f"{username}.jpg")
            with open(filepath, 'wb') as f:
                f.write(response.content)
            print(f"[{username}] Successfully downloaded.")
        else:
            print(f"[{username}] Failed to download image. HTTP Status: {response.status_code}")
    except Exception as e:
        print(f"[{username}] Error: {e}")

if __name__ == "__main__":
    usernames = [
        "lion.paballo", "barbiie.stallion", 
        "boity_tlhasi", "koketso_.m_", "zeloew", "luciazizipho", 
        "thandeka_palesa", "taunyane_tumisang"
    ]
    
    # Ensure directory exists
    output_dir = "public/images/profiles"
    os.makedirs(output_dir, exist_ok=True)
    
    for user in usernames:
        download_avatar(user, output_dir)
