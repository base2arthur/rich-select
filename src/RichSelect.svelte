<script>
  import { createEventDispatcher } from "svelte";


  export let list;
  let list_;
  let selectedIndex = 0;
 
  let show = false;
  export let value;
  export let hideValue=false
  let valueIndex;
  export let placeholder = "Pick an option";
  const  dispatch = createEventDispatcher();
  const open = () => {
      show = !show;
      selectedIndex = 0;
  };

  let search;
  const search_ = () => {
      if(search?.length>0){
          let i = 0;
          list_ = [...list_.filter(f=>f.search.includes(search.toUpperCase())).map((f) => {
              return { i: i++, ...f };
          })]
      }else{
          refreshList()
      }
  };

  const selected_ = ()=>{
      value = list_.find((f) => f.i == selectedIndex);
      show = false;
      valueIndex = selectedIndex
      dispatch("change")
  }

  function handleKeydown(event) {
      let keyCode = event.keyCode;
      if (show)
          switch (keyCode) {
              case 38:
                  if (selectedIndex > 0) {
                      selectedIndex--;
                  }

                  break;
              case 40:
                  if (selectedIndex < list_.length - 1) {
                      selectedIndex++;
                  }

                  break;
              case 13:
                  selected_()
                  break;
              case 27:
                  show=false;
                  break;
              default:
                  break;
          }
      console.log(selectedIndex);
  }

  const refreshList = ()=>{
      let i = 0;
      list_=[...list.map((f) => {
              return { i: i++, ...f };
          })]
  }
  $:if(list){
      refreshList()
  }
</script>


<svelte:window on:keydown={handleKeydown} />
<div class="relative ">
  <div class="inline-block relative w-full ">
      <button
          type="button"
          on:click={() => open()}  class="w-full flex text-left justify-between items-center px-3 py-2 text-black transition duration-100 ease-in-out border rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed bg-white border-gray-300"
          {value} >
          {#if !hideValue}
          <span class="block truncate ">{value ? value.valueOf : placeholder}</span>
          {:else}
          {placeholder}
          {/if}
          <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              class="fill-current flex-shrink-0 ml-1 h-4 w-4 text-gray-600" >
              <path  clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/>
          </svg>
      </button>
  </div>
  <!---->

  {#if show}
  <div class="absolute w-full z-10 -mt-1 border-b border-l border-r rounded-b shadow-sm bg-white border-gray-300 opacity-100 transition ease-in duration-75">
          {#if list_}
          <div class="inline-block w-full p-2 placeholder-gray-400">
              <input autofocus on:keyup={()=>search_()}  bind:value={search} on:click={() => search_()} placeholder="Search" class="inline-block w-full px-3 py-2 bg-gray-50 text-sm rounded border focus:outline-none focus:shadow-outline border-gray-300" />
          </div>
          <ul class="overflow-auto " style="max-height: 300px;">
                  
                  {#each list_ as item, i}
                      <li data-type="option" class="cursor-pointer font-semibold bg-gray-100  " >
                          <div id="bt{i}" class="flex justify-between items-center px-3 py-2 "  on:click={()=>selected_()} class:bg-blue-600={valueIndex==i} class:text-white={valueIndex==i} class:bg-blue-200={i == selectedIndex} on:mousemove={()=>selectedIndex=i}  >
                              <span class="truncate block">{item.valueOf}</span>
                              {#if valueIndex===i}
                              <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current h-4 w-4 " >
                                  <polygon points="0 11 2 9 7 14 18 3 20 5 7 18" />
                              </svg>
                              {/if}
                          </div>
                      </li>
                  {/each}
              </ul>
          {/if}
      </div>
  {/if}
</div>
