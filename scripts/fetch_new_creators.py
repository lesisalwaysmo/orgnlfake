import os
import instaloader
import requests

def fetch_creator(username, output_dir):
    L = instaloader.Instaloader(fatal_status_codes=[401, 404, 429])
    try:
        profile = instaloader.Profile.from_username(L.context, username)
        
        followers = profile.followers
        posts = profile.mediacount
        
        # Estimate Engagement and Reach
        # Typically ER for these sizes is 5-8%, Reach is ~1.5x followers
        engagement_rate = round(max((150000 / (followers + 10000)) + 3.0, 4.5), 1) # Simple synthetic curve
        total_reach = int(followers * 1.5)
        
        url = profile.profile_pic_url
        print(f"[{username}] Followers: {followers}, Posts: {posts}")
        print(f"[{username}] Estimated ER: {engagement_rate}%, Estimated Reach: {total_reach}")
        
        # Download image
        response = requests.get(url)
        if response.status_code == 200:
            filepath = os.path.join(output_dir, f"{username}.jpg")
            with open(filepath, 'wb') as f:
                f.write(response.content)
            print(f"[{username}] dp saved.")
        else:
            print(f"[{username}] Failed to download dp.")
    except Exception as e:
        print(f"[{username}] Error: {e}")

if __name__ == "__main__":
    usernames = ["_booysen", "__bellaswrld", "they_adore_tshego"]
    output_dir = "public/images/profiles"
    os.makedirs(output_dir, exist_ok=True)
    for user in usernames:
        fetch_creator(user, output_dir)
