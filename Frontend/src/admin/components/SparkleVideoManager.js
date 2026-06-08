import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, Button, TextField, Grid,
  IconButton, CircularProgress, LinearProgress, Chip, Avatar, Switch, FormControlLabel
} from '@mui/material';
import { Trash2, Upload, Video, Plus, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { uploadVideoViaBackend, deleteAssetViaBackend } from '../../utils/cloudinaryUtils';
import { API_BASE_URL } from '../../config/apiConfig';

const BRAND = '#755970';

const SparkleVideoManager = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [form, setForm] = useState({ title: '', price: '', oldPrice: '', discount: '', displayOrder: 0 });
  const [pendingVideo, setPendingVideo] = useState(null); // { secure_url, public_id }
  const [saving, setSaving] = useState(false);
  const jwt = localStorage.getItem('jwt');

  const fetchVideos = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/sparkle-videos/admin`, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      const data = await res.json();
      setVideos(Array.isArray(data) ? data : []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchVideos(); }, []);

  const handleVideoFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadProgress(0);
    try {
      const result = await uploadVideoViaBackend(file, 'loupe-jewels/videos', (pct) => setUploadProgress(pct));
      setPendingVideo({ secure_url: result.secure_url, public_id: result.public_id });
    } catch (err) {
      alert('Video upload failed: ' + err.message);
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1500);
    }
  };

  const handleSave = async () => {
    if (!pendingVideo || !form.title || !form.price) return alert('Fill in title, price and upload a video first.');
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/sparkle-videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` },
        body: JSON.stringify({ ...form, videoUrl: pendingVideo.secure_url, videoPublicId: pendingVideo.public_id }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setForm({ title: '', price: '', oldPrice: '', discount: '', displayOrder: 0 });
      setPendingVideo(null);
      fetchVideos();
    } catch (err) {
      alert('Save failed: ' + err.message);
    } finally { setSaving(false); }
  };

  const handleDelete = async (video) => {
    if (!window.confirm(`Delete "${video.title}"?`)) return;
    try {
      await fetch(`${API_BASE_URL}/api/sparkle-videos/${video._id}`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${jwt}` }
      });
      fetchVideos();
    } catch (e) { alert('Delete failed'); }
  };

  const handleToggle = async (video) => {
    try {
      await fetch(`${API_BASE_URL}/api/sparkle-videos/${video._id}/toggle`, {
        method: 'PATCH', headers: { Authorization: `Bearer ${jwt}` }
      });
      fetchVideos();
    } catch (e) { alert('Toggle failed'); }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 0 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#111827', letterSpacing: '-1px' }}>
            Sparkle Videos
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, mt: 0.5 }}>
            Manage videos shown in the "Find Your Perfect Sparkle" section on the homepage.
          </Typography>
        </Box>
      </motion.div>

      {/* Upload Form */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <Card sx={{ borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar sx={{ bgcolor: '#f0f9ff', color: BRAND, width: 44, height: 44, borderRadius: '12px' }}>
                <Plus size={20} />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#111827' }}>Add New Sparkle Video</Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>Upload a video and fill in the product details</Typography>
              </Box>
            </Box>

            {/* Video Upload Zone */}
            <Box
              component="label"
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                p: 4, border: `2px dashed ${uploading ? '#94a3b8' : BRAND}`, borderRadius: '16px',
                bgcolor: pendingVideo ? '#f0fff4' : uploading ? '#f8fafc' : '#f0f9ff',
                cursor: uploading ? 'not-allowed' : 'pointer', transition: 'all 0.3s', mb: 3,
                '&:hover': { bgcolor: uploading ? '#f8fafc' : '#e0f2fe' }
              }}
            >
              <Avatar sx={{ bgcolor: '#fff', color: pendingVideo ? '#22c55e' : uploading ? '#94a3b8' : BRAND, width: 56, height: 56, mb: 2, boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
                {uploading ? <CircularProgress size={24} sx={{ color: '#94a3b8' }} /> : pendingVideo ? <CheckCircle size={24} /> : <Video size={24} />}
              </Avatar>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: pendingVideo ? '#16a34a' : uploading ? '#94a3b8' : '#1e293b' }}>
                {uploading ? 'Uploading video to Cloudinary...' : pendingVideo ? '✓ Video uploaded successfully!' : 'Click to upload a video (MP4, WEBM, MOV)'}
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, mt: 0.5 }}>
                Max 100MB · Stored at best quality
              </Typography>
              <input type="file" accept="video/*" hidden disabled={uploading} onChange={handleVideoFile} />
            </Box>

            {uploading && (
              <Box sx={{ mb: 3 }}>
                <LinearProgress
                  variant={uploadProgress > 0 ? 'determinate' : 'indeterminate'}
                  value={uploadProgress}
                  sx={{ borderRadius: 4, height: 6, bgcolor: '#e2e8f0', '& .MuiLinearProgress-bar': { bgcolor: BRAND } }}
                />
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, mt: 0.5, display: 'block', textAlign: 'center' }}>
                  {uploadProgress > 0 ? `${uploadProgress}% — Saving at best quality on Cloudinary...` : 'Preparing...'}
                </Typography>
              </Box>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Product Title *" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField label="Price (₹) *" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                  fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField label="Old Price (₹)" value={form.oldPrice} onChange={e => setForm(p => ({ ...p, oldPrice: e.target.value }))}
                  fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField label="Discount (e.g. 7% Off)" value={form.discount} onChange={e => setForm(p => ({ ...p, discount: e.target.value }))}
                  fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField label="Display Order" type="number" value={form.displayOrder} onChange={e => setForm(p => ({ ...p, displayOrder: Number(e.target.value) }))}
                  fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={handleSave}
                  disabled={!pendingVideo || !form.title || !form.price || saving}
                  variant="contained"
                  startIcon={saving ? <CircularProgress size={16} sx={{ color: '#fff' }} /> : <Plus size={18} />}
                  sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 800, bgcolor: BRAND, '&:hover': { bgcolor: '#5fa0b8' }, px: 4 }}
                >
                  {saving ? 'Saving...' : 'Add Sparkle Video'}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>

      {/* Video List */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <CircularProgress sx={{ color: BRAND }} />
        </Box>
      ) : videos.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Video size={48} color="#cbd5e1" />
          <Typography sx={{ color: '#94a3b8', fontWeight: 600, mt: 2 }}>No sparkle videos yet. Upload one above.</Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {videos.map((video, i) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={video._id}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card sx={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 2px 10px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                  <Box sx={{ position: 'relative', aspectRatio: '4/5', bgcolor: '#0f172a' }}>
                    <video
                      src={video.videoUrl}
                      muted autoPlay loop playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: video.isActive ? 1 : 0.4 }}
                    />
                    <Chip
                      label={video.isActive ? 'Active' : 'Hidden'}
                      size="small"
                      sx={{ position: 'absolute', top: 10, left: 10, bgcolor: video.isActive ? '#22c55e' : '#94a3b8', color: '#fff', fontWeight: 700, fontSize: '0.65rem' }}
                    />
                    <Chip
                      label={`Order #${video.displayOrder}`}
                      size="small"
                      sx={{ position: 'absolute', top: 10, right: 10, bgcolor: 'rgba(0,0,0,0.5)', color: '#fff', fontWeight: 700, fontSize: '0.65rem' }}
                    />
                  </Box>
                  <CardContent sx={{ p: 1.5 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#111827', mb: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {video.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Typography sx={{ color: BRAND, fontWeight: 700, fontSize: '0.85rem' }}>₹{video.price}</Typography>
                      {video.oldPrice && <Typography sx={{ color: '#94a3b8', fontSize: '0.75rem', textDecoration: 'line-through' }}>₹{video.oldPrice}</Typography>}
                      {video.discount && <Chip label={video.discount} size="small" sx={{ bgcolor: '#fef3c7', color: '#92400e', fontWeight: 700, fontSize: '0.6rem', height: 18 }} />}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <IconButton
                        onClick={() => handleToggle(video)}
                        size="small"
                        sx={{ bgcolor: video.isActive ? '#f0fff4' : '#f8fafc', color: video.isActive ? '#22c55e' : '#94a3b8', borderRadius: '8px' }}
                      >
                        {video.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(video)}
                        size="small"
                        sx={{ bgcolor: '#fff1f2', color: '#f43f5e', borderRadius: '8px', '&:hover': { bgcolor: '#ffe4e6' } }}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SparkleVideoManager;
