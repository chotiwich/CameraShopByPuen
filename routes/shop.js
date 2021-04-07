<%- include('../includes/head.ejs') %> 

<div class="cart-view-table">
    <div class="zigzag-bottom"></div>
    <div class="container">
        <div class="row">
        <% if (prods.length > 0) { %> 
                        <% prods.map((product, index) => { %>
            <div class="col-md-3 col-sm-3">
                <div class="single-shop-product">
                     <a href="<%- '/products/detail/'+product._id%>">
                            
                    <div class="aa-product-img" >
                        <img src="<%- product.img_path%>" alt="" width="400" height="400"/>
                    </div></a>
                    <h2><%- product.product_name%></h2>
                    <div class="product-carousel-price">
                        <!-- <ins>$899.00</ins> <del>$999.00</del> -->
                        <%- product.price%>
                    </div>
                    <div>
                            
                    </div>       
                    <div class="product-option-shop">
                        <a class="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="70" rel="nofollow" href="/canvas/shop/?add-to-cart=70">Add to cart</a>
                    </div>
                   
                </div>
            </div>
        </div>
        <% }) %> 
        <% } else   { %>
        <h1>No Products Found!</h1>
        <% } %>
        <div class="row">
            <div class="col-md-12">
                <div class="product-pagination text-center">
                    <nav>
                        <ul class="pagination">
                            <li>
                                <a href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li>
                                <a href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
<%- include('../includes/end.ejs') %>
