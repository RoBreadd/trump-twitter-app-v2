import gpt_2_simple as gpt2

def generate_tweet(n):
    sess = gpt2.start_tf_sess()
    gpt2.load_gpt2(sess, run_name='trump-model-v1')
    output = gpt2.generate(sess,
        run_name='trump-model-v1',
        length=100,
        temperature=0.7,
        batch_size=n,
        nsamples=n,
        prefix="<|startoftext|>",
        truncate="<|endoftext|>",
        include_prefix=False,
        return_as_list=True
    )
    print(output)
    return output
