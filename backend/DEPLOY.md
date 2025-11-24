# Cara Deploy ke Hugging Face Spaces

Backend sudah connected ke HF Spaces. Tinggal push kapan aja mau update.

## Deploy/Update Backend

```bash
cd backend
git add .
git commit -m "Update: deskripsi perubahan"
git push hf main
```

## Info

- **Space URL**: https://huggingface.co/spaces/nafalrust/Technoversary
- **Remote**: git@hf.co:spaces/nafalrust/Technoversary
- **Branch**: main

Setiap kali push, HF Spaces otomatis rebuild dan deploy.
