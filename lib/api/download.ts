const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const DownloadAPI = {
  resume: () => {
    const url = `${API_BASE}download/resume`;
    window.location.href = url
  }
};