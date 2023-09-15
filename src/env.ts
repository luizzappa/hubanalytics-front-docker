const backendUrl = 'http://127.0.0.1:8000';

const endpoints = {
  add_painel: `${backendUrl}/paineis/`,
  baseUrl: backendUrl,
  delete_painel: `${backendUrl}/painel/`,
  get_unique_tags: `${backendUrl}/uniquetags/`,
  get_paineis: `${backendUrl}/paineis/`,
  patch_painel: `${backendUrl}/painel/`,
  extract_keywords: `${backendUrl}/extractkeywords/`
}

export default endpoints;