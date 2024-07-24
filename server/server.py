from flask import Flask, jsonify, request
from flask_cors import CORS
from transformers import pipeline
import requests
from dotenv import load_dotenv
import os



app = Flask(__name__)
CORS(app)

load_dotenv()

def summarize_text(text):
    summarizer = pipeline("summarization", model='facebook/bart-large-cnn')
    summary = summarizer(text, max_length=250, min_length=100, do_sample=False)
    print(summary[0])
    return summary[0]['summary_text']


@app.route('/api/retrieve', methods=['GET'])
def retrieveDescription():
    query = request.args.get('query', type=str)
    api_key = os.getenv('API_KEY')
    url = f'https://newsapi.org/v2/everything?q={query}&language=en&apiKey={api_key}'
    response = requests.get(url)
    description = ''
    if response:
        for article in response.json()['articles'][:10]:
            description += article['description'] + ' '
    else:
        description = 'Failed to retrieve news'
    res = summarize_text(description)
    return jsonify(res)
            

if __name__ == '__main__':
    app.run(debug=True, port=8080)