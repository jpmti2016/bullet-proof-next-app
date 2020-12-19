import {useRouter} fromm 'next/router'

function Post(){
  const router = useRouter()
  if(router.isFallback){
    return <div>Loading...</div>
  }
 }

function getStaticPaths(){
  ...
  return {
  ...,
  fallback: true
}

