from flask import Flask, render_template,request,url_for
import numpy as np
import pickle

app=Flask(__name__)

@app.route('/')
def home():
  return render_template('p3.html')
@app.route('/predict')
def index() :
  return render_template("p2.html")

@app.route('/data_predict', methods=['POST'])
def predict():
  age = request.form['age']
  gender = request.form['gender']
  tb = request.form['tb']
  db = request.form['db']
  ap = request.form['ap']
  aa1 = request.form['aa1']
  aa2 = request.form['aa2']
  tp = request.form['tp']
  a = request.form['a']
  agr = request.form['agr']


  data = [[float(age), float(gender), float(tb), float(db), float(ap), float(aa1), float(aa2), float(tp), float(a), float(agr),]]


  model = pickle.load(open('liver_analysis.pk1', 'rb'))
  inputs=[float(x) for x in request.form.value()]
  inputs=np.array([inputs])
  inputs=model.transform(inputs)
  prediction= model.predict(data)[0]
  if (prediction == 1):
    return render_template('noChance.html', prediction='You have a liver  desease problem,You must concern doctor')
  else:
       return render_template('Chance.html', prediction='You dont have a liver  desease problem')


if __name__=='__main__':
  app.run()