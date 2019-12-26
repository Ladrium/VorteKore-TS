declare namespace ImgurHot {

	export interface AdConfig {
		safeFlags: string[];
		highRiskFlags: string[];
		unsafeFlags: string[];
		wallUnsafeFlags: any[];
		showsAds: boolean;
	}

	export interface Datum {
		id: any;
		hash: string;
		author: string;
		account_id?: any;
		account_url?: any;
		title: string;
		score: number;
		size: number;
		views: string;
		is_album: boolean;
		album_cover: string;
		album_cover_width: number;
		album_cover_height: number;
		mimetype: string;
		ext: string;
		width: number;
		height: number;
		animated: boolean;
		looping: boolean;
		reddit: string;
		subreddit: string;
		description: string;
		create_datetime: string;
		bandwidth: any;
		timestamp: string;
		section: string;
		nsfw: boolean;
		prefer_video: boolean;
		video_source: string;
		video_host?: any;
		num_images: number;
		in_gallery: boolean;
		favorited: boolean;
		adConfig: AdConfig;
	}

	export interface RootObject {
		data: Datum[];
		success: boolean;
		status: number;
	}

}

