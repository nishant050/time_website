// netlify/functions/github-api.js
const axios = require('axios');

const {
  GITHUB_TOKEN,
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_FILE_PATH
} = process.env;

exports.handler = async function(event, context) {
  const githubApiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;

  if (event.httpMethod === 'GET') {
    try {
      const response = await axios.get(githubApiUrl, {
        headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
      });
      const content = Buffer.from(response.data.content, 'base64').toString();
      return {
        statusCode: 200,
        body: content
      };
    } catch (error) {
      return { statusCode: 500, body: 'Error fetching content' };
    }
  } else if (event.httpMethod === 'POST') {
    try {
      const { content } = JSON.parse(event.body);
      const currentFile = await axios.get(githubApiUrl, {
        headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
      });
      const response = await axios.put(
        githubApiUrl,
        {
          message: 'Update content',
          content: Buffer.from(content).toString('base64'),
          sha: currentFile.data.sha
        },
        { headers: { 'Authorization': `token ${GITHUB_TOKEN}` } }
      );
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ success: false }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};