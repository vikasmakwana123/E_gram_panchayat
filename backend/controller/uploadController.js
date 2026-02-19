import { createClient } from '@supabase/supabase-js';
import path from 'path';


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn('[UploadController] Supabase URL or Key missing in .env');
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');
const BUCKET_NAME = 'applications';

export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.' });
        }

        const file = req.file;
        const fileExt = path.extname(file.originalname);
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExt}`;

        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(fileName, file.buffer, {
                contentType: file.mimetype,
                upsert: false
            });

        if (error) {
            console.error('[UploadController] Supabase upload error:', error);
            throw error;
        }

        const { data: publicUrlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(fileName);

        res.json({
            success: true,
            url: publicUrlData.publicUrl,
            fileName: file.originalname
        });

    } catch (error) {
        console.error('[UploadController] Error:', error);
        res.status(500).json({ success: false, message: 'Upload failed', error: error.message });
    }
};
