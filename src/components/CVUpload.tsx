import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, X } from 'lucide-react';
import { Button } from './ui/Button';

const CVUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="p-8 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-4 hover:border-primary/40 transition-all cursor-pointer relative group">
        <input
          type="file"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
          accept=".pdf,.doc,.docx"
        />
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 group-hover:text-primary transition-colors">
          {success ? <CheckCircle size={32} className="text-green-500" /> : <Upload size={32} />}
        </div>
        <div>
          <p className="text-sm font-bold">{file ? file.name : 'Upload your CV / Resume'}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">PDF, DOCX up to 5MB</p>
        </div>
      </div>

      {file && !success && (
        <Button
          onClick={handleUpload}
          className="w-full py-3 text-[10px] uppercase tracking-widest"
          isLoading={uploading}
        >
          Confirm Upload
        </Button>
      )}

      {success && (
        <div className="flex items-center justify-center space-x-2 text-green-500 text-[10px] font-black uppercase tracking-widest">
          <CheckCircle size={14} />
          <span>CV Uploaded Successfully</span>
        </div>
      )}
    </div>
  );
};

export default CVUpload;
