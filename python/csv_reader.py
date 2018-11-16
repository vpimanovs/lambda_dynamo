import boto3

s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')

def csv_reader(event, context):
    
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    
    obj = s3.get_object(Bucket=bucket, Key=key)
    
    rows = obj['Body'].read().split('\n')
    
    table = dynamodb.Table('batch-date')
    
    with table.batch_writer() as batch:
        for row in rows:
            batch.put_item(Item={
                
                'Journal Code':row.split(',')[0],
                'Despatch Method':row.split(',')[1],
                'Currency code':row.split(',')[2],
                'Full / Stu':row.split(',')[3],
                'Product':row.split(',')[4],
                'Terms':row.split(',')[5],
                'saving rounded':row.split(',')[6],
                'saving calc':row.split(',')[7],
                'Term code':row.split(',')[8],
                'Weeks':row.split(',')[9],
                'Rate':row.split(',')[10],
                'Price/ week':row.split(',')[11],
                'Calc % Savigs Print':row.split(',')[12],
                'Calc % Savings Digital':row.split(',')[13],
                'Calc % Savings Print + Digital':row.split(',')[14],
                'Print':row.split(',')[15],
                'Digital':row.split(',')[16]
            })
