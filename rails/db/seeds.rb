# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.create(first_name: "Arnie", last_name: "Li", email: "dsnadsn@gmail.com", token: "123", facebook_id: "69", political_leaning: 1)


topics = ["Climate Change", "Guns", "Abortion", "Education", "Taxes", "Foreign Policy"]
topics.each do |topic_name|
  Topic.create(name: topic_name)
end

user = User.find_by(first_name: "Arnie")
user.topics = Topic.where(name:"Education")
user.save!




# #<User id: 1, first_name: "name", last_name: nil, email:
# "danielmxli@gmail.com", img_path: nil, token:
# "EAAYfq4csOBIBADcN8HUHQZAYZB8Ydc2bHZCveL6ZArD4VLk5C...", created_at:
# "2016-11-13 03:21:14", updated_at: "2016-11-13 03:26:15", facebook_id:
# "10209909571269807", political_leaning: 0.5>]>
