"use client";
import React, { useState, useRef } from 'react';
import { UploadCloud, FileType, CheckCircle, XCircle } from 'lucide-react';
import { uploadFile } from '@/lib/api';

export function Uploader({ onUploadSuccess }: { onUploadSuccess: () => void }) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [statusMsg, setStatusMsg] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            await handleFileUpload(e.dataTransfer.files[0]);
        }
    };

    const handleFileUpload = async (file: File) => {
        setIsUploading(true);
        setStatusMsg("Uploading...");
        try {
            await uploadFile(file);
            setStatusMsg("Upload successful!");
            onUploadSuccess();
            setTimeout(() => setStatusMsg(""), 3000);
        } catch (error) {
            console.error(error);
            setStatusMsg("Upload failed. Ensure you are logged in.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div 
            className={`w-full p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all ${isDragging ? 'border-brand-cyan bg-brand-cyan/10' : 'border-white/20 bg-black/20 hover:border-white/40'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
        >
            <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])} 
            />
            
            {isUploading ? (
                <div className="flex flex-col items-center gap-4 animate-pulse text-brand-cyan">
                    <UploadCloud className="w-12 h-12" />
                    <span>Processing & Uploading...</span>
                </div>
            ) : statusMsg.includes("success") ? (
                <div className="flex flex-col items-center gap-4 text-green-400">
                    <CheckCircle className="w-12 h-12" />
                    <span>{statusMsg}</span>
                </div>
            ) : statusMsg.includes("failed") ? (
                 <div className="flex flex-col items-center gap-4 text-brand-magenta">
                    <XCircle className="w-12 h-12" />
                    <span>{statusMsg}</span>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4 text-white/50">
                    <FileType className="w-12 h-12" />
                    <span className="text-lg">Drag & Drop an Industrial Document</span>
                    <span className="text-sm">or click to browse</span>
                </div>
            )}
        </div>
    );
}
