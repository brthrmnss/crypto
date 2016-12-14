<div    id="quickCheckList"  > <!-- class="panel panel-default" -->

  Quick Reload.
  <br />
  ...
  <div class="bg">
    <div horizontal-layout >
      <navbtn id="menuBtn" >
        <span class="glyphicon glyphicon-align-left" aria-hidden="true"></span>
      </navbtn>
      <navbtn>
        <span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
      </navbtn>
      <!--<prog-btn></prog-btn>
      <prog-btn2 lbl-x="453c" lbl-x2="uuy"></prog-btn2>-->
      <div class="page-title" stretch>Details{{app.pageTitle}}</div>
      <navbtn>
        <span class="glyphicon glyphicon-flag" aria-hidden="true"></span>
      </navbtn>
      <navbtn>
        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
      </navbtn>
    </div>

    <div class="hr" />

    <section todiv class="bg-body" >

<!--

      <quicklist dp="{{app.data.tabGoList}}" />
-->



      <!--{{vm.y}} {{vm}}-->
      <br  />





      <quick-crud
              show-title="List Prompts"
              url-src="httpasdf2"

              config="quickCrud3"
              asdf-form-object="formObject">
        <item-renderer>
          <li ng-repeat="item in vmC.items" class="" layout="row">
            <h3 ng-click="goTo(item)" class="prompt-title">
              {{item.name}}
            </h3>
            <span flex/>

            <div ng-click="goTo(item)"
                 class="sideNavTextRow2">{{item.first_name}}
              {{item.last_name}}
            </div>

            <span layout="row" layout-align="center center"

            >
        <div ng-if="item.selected==true">$</div>

              <span class="prompt-notification-icons glyphicon glyphicon-console"
                    ng-show="item.prompt_type=='prompt'"
                    aria-hidden="true"></span>

      <span class="prompt-notification-icons glyphicon glyphicon-ok-circle"
            ng-show="item.prompt_type=='checklist-single'"
            aria-hidden="true"></span>

           <span class="glyphicon glyphicon-list-alt"
                 ng-show="item.prompt_type=='checklist'"
                 aria-hidden="true"></span>

              <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>

            <button mini-btn
                    class="btn-nav-list btn btn-sm btn-info ng-click-active md-button"
                    alt="Edit Prompt"
                    ng-click="config.fxEditItem(item)">
              <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            </button>

            <button mini-btn
                    class="btn-nav-list  btn btn-sm btn-info ng-click-active md-button"
                    ng-click="config.fxAddItem(item)"
                    alt="Create new log entry from prompt"
            >
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>

            </button>

               <button
                       class="btn-nav-list btn btn-sm btn-danger ng-click-active md-button"
                       ng-click="vmC.$scope.$parent.deleteItem(item)">

                 <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>

               </button>



                 </span>
          </li>
        </item-renderer>
      </quick-crud>




      <br />
      <quick-list
              plain-list="true"
              padding-left="5px"
              style="height: 300px; overflow:hidden; overflow-y:scroll;"
              items="vm.listData"
              selected-index="selectedIndex"
              _selected-index2="selectedIndex"
              fx-item-selected="onSelectListItem"
              panel="false"
              config="quickListConfig"
              >
        <list>
          <!--length: {{vmC.items.length}}-->
          <ul id="listHolder"
              class="quick-crud-list" >
            <li ng-repeat="item in vmC.items"  >
              {{item.name}}
              <div ng-click="goTo(item)"
                   class="sideNavTextRow2">{{item.first_name}}
                {{item.last_name}}
              </div>
              <div ng-click="vmC.$scope.$parent.deleteItem(item)">x</div>
              <div ng-if="item.selected==true">selected</div>
            </li>
          </ul>

        </list>
      </quick-list>


      <div horizontal-layout _xadd-class-to-children="pad10" >
        <mini-panel stretch class="mini-panel-left" >
          <span class="larger-text">Chalton</span><br/>
          <span class="alt-text bold" upcase>london</span>
        </mini-panel>
        <spacer ></spacer>
        <mini-panel stretch class="" >
          <span class="larger-text">Stoke City</span><br/>
          <span class="alt-text bold" upcase>stokeon-trent</span>
        </mini-panel>

      </div>

      <br />
      <!-- https://dribbble.com/shots/2644150-Kick-Score-->
      <div vertical-layout >


        <prog-bar-list name="progress" progress-type="left"
                left-text="'" right-text="13'"
                lbl-x="sdf"
                       progress-bar-progress="60"
                >ddd</prog-bar-list>

        <prog-bar-list name="attempts" progress-type="left"
                       left-text="0'" right-text="5"
                       lbl-x="sdf" txt2="4444"
                       progress-bar-progress="60"
                >ddd</prog-bar-list>

        <prog-bar-list name="on target" progress-type="center"
                       left-text="13\'" right-text="ddd"
                       lbl-x="sdf" txt2="4444"
                       ppp="5555555"
                       progress-bar-progress="60"
                >ddd</prog-bar-list>
     <!--
        <div aboslute-container >
          <div absolute horizontal-layout _xadd-class-to-children="pad10" >
            dsdfgd ldfg dfgjdjfg dfgld fgldfg lldfgdfg
          </div>
          <div   horizontal-layout _xadd-class-to-children="pad10" >
            <div class="progress-list-left" ></div>
            <div stretch upcase class="progress-list-center" >Progress</div>
            <div class="progress-list-right" >12</div>
          </div>
        </div>


        <div horizontal-layout _xadd-class-to-children="pad10" >
          <div class="progress-list-left" >0</div>
          <div stretch upcase class="progress-list-center" >Score</div>
          <div class="progress-list-right" >1</div>
        </div>

        <div horizontal-layout _xadd-class-to-children="pad10" >
          <div class="progress-list-left" >3</div>
          <div stretch upcase class="progress-list-center" >attempt</div>
          <div class="progress-list-right" >5</div>
        </div>


        <progress-list-bar value="{{vm.value}}" left-num="{{vm.left}}"
                           right-num="{{vm.right}}" >

        </progress-list-bar>

-->
      </div>
    </section>

  </div>



  <t>
    Text? contents
  </t>
  <tX>
    Tx contents
  </tX>

  <div class="example-html">
    <p> <i> Behold!</i> It counts up and down as you click the buttons </p>

    <button id="up"> Up </button>
    <button id="down"> Down </button>
    <span id="counter">0</span>
  </div>

</div>